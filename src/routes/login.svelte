<script lang="ts">
	import Textfield from '@smui/textfield';
	import Icon from '@smui/textfield/icon';
	import HelperText from '@smui/textfield/helper-text';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button, { Label } from '@smui/button';
	import CircularProgress from '@smui/circular-progress';

	import { fade } from 'svelte/transition';
	import { RegisterUserModel } from '$lib/models/user/RegisterUserModel';
	import { LoginUserModel } from '$lib/models/user/LoginUserModel';

	import { endpointPost } from '$lib/utils/EndpointHelper';
	import type { ServiceResponse } from '$lib/models/ServiceResponse';
	import { ErrorState, ValidationErrorType } from '$lib/models/core/ValidationResult';
	import { supabase } from '$lib/db';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Session } from '@supabase/supabase-js';
	import jwt_decode from 'jwt-decode';
	import { ErrorMessages } from '$lib/models/core/Messages';

	let email: string = 'zicho';
	let username: string = 'zicho';
	let password: string = 'datalosen12';
	let passwordConfirm: string = 'datalosen12';

	let loading: boolean = false;
	let errorState: ErrorState = new ErrorState();
	errorState.hasError = false;

	enum FormMode {
		Login,
		Register
	}

	let selectedMode: FormMode = FormMode.Login;

	$: disabled = false;

	const register = async (model: RegisterUserModel) => {
		try {
			const res = await endpointPost<ServiceResponse<Session>>('api/register', model);

			if (!res.success) {
				errorState.hasError = true;
				errorState.message = res.message;
			} else {
				$session.user = jwt_decode(res.data.access_token);
				console.dir($session.user);
				goto('/');
			}
		} catch (err) {
		} finally {
			loading = false;
		}
	};

	const login = async (model: LoginUserModel) => {
		try {
			const res = await endpointPost<ServiceResponse<Session>>('api/login', model);

			if (!res.success) {
				console.log('error');
				errorState.hasError = true;
				errorState.message = res.message;
			} else {
				$session.user = jwt_decode(res.data.access_token);
				goto('/');
			}
		} catch (err) {
			console.log(err);
			errorState.message = ErrorMessages.GenericError;
			errorState.hasError = true;
		} finally {
			loading = false;
		}
	};

	const onFormSubmit = async () => {
		loading = true;
		errorState.hasError = false;
		if (selectedMode == FormMode.Login) {
			let model = new LoginUserModel(email, password);

			await login(model).finally(() => {
				loading = false;
			});
		} else if (selectedMode == FormMode.Register) {
			let model = new RegisterUserModel(email, username, password, passwordConfirm);

			let validationResult = model.validate();

			if (!validationResult.success) {
				errorState.message = validationResult.message;
				errorState.errorType = validationResult.errorType;
				errorState.hasError = true;
				loading = false;
				return;
			}

			await register(model).finally(() => {
				loading = false;
			});
		}
	};
</script>

<svelte:head>
	<title>{selectedMode == FormMode.Login ? 'Login' : 'Register'}</title>
</svelte:head>

<LayoutGrid fixedColumnWidth>
	<Cell span={12}>
		<div class="mdc-elevation--z2 login-container">
			<form action="/api/login" method="post" on:submit|preventDefault={() => onFormSubmit()}>
				<Textfield
					required
					class="w-100"
					variant="outlined"
					bind:value={email}
					label={selectedMode == FormMode.Login ? 'Email or username' : 'Email'}
				>
					<Icon class="material-icons" slot="trailingIcon">email</Icon>
				</Textfield>

				{#if selectedMode == FormMode.Register}
					<div in:fade>
						<Textfield
							required
							class="w-100 margin-top-l mdc-elevation--z4"
							variant="outlined"
							bind:value={username}
							label="Choose username"
						>
							<Icon class="material-icons" slot="trailingIcon">person</Icon>
						</Textfield>
					</div>
				{/if}

				<Textfield
					type="password"
					required
					class="w-100 margin-top-l"
					variant="outlined"
					bind:value={password}
					label="Password"
					invalid={errorState.hasError &&
						errorState.errorType === ValidationErrorType.PasswordMismatch}
				>
					<Icon class="material-icons" slot="trailingIcon">key</Icon>
				</Textfield>

				{#if selectedMode == FormMode.Register}
					<div in:fade>
						<Textfield
							type="password"
							required
							class="w-100 margin-top-l"
							variant="outlined"
							bind:value={passwordConfirm}
							label="Confirm password"
							invalid={errorState.hasError &&
								errorState.errorType === ValidationErrorType.PasswordMismatch}
						>
							<Icon class="material-icons" slot="trailingIcon">check</Icon>
						</Textfield>
					</div>
				{/if}

				<Button disabled={loading || disabled} class="w-100 margin-top-l" variant="raised">
					{#if loading}
						<CircularProgress
							class="my-colored-circle"
							style="height: 21px; width: 21px;"
							indeterminate
						/>
					{:else}
						<Label>{selectedMode == FormMode.Login ? 'Login' : 'Register'}</Label>
					{/if}
				</Button>
				<div
					class="{errorState.hasError === false
						? 'hidden'
						: ''} error label-area mdc-typography--subtitle1"
				>
					{errorState.message}
				</div>
				<div class="label-area mdc-typography--subtitle1">
					{#if selectedMode == FormMode.Login}
						<a
							href="#"
							on:click={() => {
								selectedMode = FormMode.Register;
								errorState.hasError = false;
							}}>Click here to create an account</a
						>
					{:else}
						<a
							href="#"
							on:click={() => {
								selectedMode = FormMode.Login;
								errorState.hasError = false;
							}}>Press here to login.</a
						>
					{/if}
				</div>
			</form>
		</div>
	</Cell>
</LayoutGrid>

<style lang="scss">
	@use '@material/typography/mdc-typography';
	@use '@material/theme/color-palette';
	@use '@material/elevation/mdc-elevation';

	$error: color-palette.$red-900;

	.label-area {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}

	.hidden {
		visibility: hidden;
	}

	.error {
		color: $error;
	}
</style>
