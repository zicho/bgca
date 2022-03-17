<script lang="ts">
	import { browser } from '$app/env';
	import {
		confirmDialogIsOpen,
		dialogMessage,
		onDialogConfirmClicked
	} from '$lib/stores/DialogStore';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';

	let open: boolean = true;

	function closeHandler(e: CustomEvent<{ action: string }>) {
		$confirmDialogIsOpen = false;
		open = true;
	}
</script>

{#if browser && $confirmDialogIsOpen}
	<Dialog
		bind:open
		
		aria-labelledby="simple-title"
		aria-describedby="simple-content"
		on:SMUIDialog:closed={closeHandler}
	>
		<!-- <Title id="simple-title">{dialogTitle}</Title> -->
		<Content id="simple-content">{$dialogMessage}</Content>
		<Actions>
			<Button on:click={() => ($confirmDialogIsOpen = false)}>
				<Label>No</Label>
			</Button>
			<Button on:click={() => onDialogConfirmClicked()}>
				<Label>Yes</Label>
			</Button>
		</Actions>
	</Dialog>
{/if}
