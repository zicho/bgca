<script lang="ts">
	import { session } from '$app/stores';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>


{#if $session?.user}
	<LayoutGrid fixedColumnWidth>
		<Cell span={12}>
			<div class="mdc-elevation--z2">
				Profile of {$session?.user.email}
			</div>
		</Cell>
	</LayoutGrid>
{/if}
