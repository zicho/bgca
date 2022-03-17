<script lang="ts" context="module">
	import { supabase } from '$lib/db';
	let publicRoutes: string[] = ['/about'];
	let nonAuthedRoutes: string[] = ['/login', '/register'];

	export async function load({ session, url }) {
		let path: string = url.pathname;

		if (session?.user == null) {
			if (publicRoutes.includes(path) || nonAuthedRoutes.includes(path)) {
				return {
					status: 200
				};
			} else
				return {
					status: 302,
					redirect: '/login'
				};
		} else {
			if (nonAuthedRoutes.includes(path)) {
				return {
					status: 302,
					redirect: '/'
				};
			}

			return {
				status: 200
			};
		}
	}
</script>

<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Button, { Icon, Label } from '@smui/button';
	import { goto } from '$app/navigation';
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
	import { showConfirmDialog } from '$lib/stores/DialogStore';
	import { session } from '$app/stores';

	const onLogoutClicked = () => {
		showConfirmDialog('Do you want to sign out?', logout);
	};

	const logout = async () => {
		await fetch('/api/logout', {
			method: 'POST'
		}).finally(() => {
			$session.user = null;
		});
	};
</script>

<div class="top-app-bar-container flexor">
	<TopAppBar variant="static">
		<Row>
			<Section>
				<!-- <IconButton class="material-icons">menu</IconButton> -->
				<Title style="cursor: pointer !important;" on:click={() => goto('/')}>BGCA</Title>
			</Section>

			<Section align="end" toolbar>
				{#if $session?.user}
					<Button style="margin-right: 20px" href="profile">
						<Icon class="material-icons">person</Icon>
						<Label>Profile</Label>
					</Button>
					<Button style="position: relative;">
						<Label>Messages</Label>
						<Icon class="material-icons">email</Icon>
					</Button>
					<Button on:click={onLogoutClicked}>
						<Icon class="material-icons">logout</Icon>
					</Button>

					<!-- 
				<Button href="'/profile'">
					<Icon class="material-icons">person</Icon><Label>Profile</Label>
				</Button> -->
				{/if}
			</Section>
		</Row>
	</TopAppBar>
	<div style="margin-top: 2em;" />
	<div class="flexor-content">
		<slot />
	</div>
</div>

<ConfirmDialog />

<style lang="scss">
</style>
