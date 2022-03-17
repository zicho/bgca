<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Card, { Content, Actions } from '@smui/card';
	import { session } from '$app/stores';
	import Button, { Label } from '@smui/button';
	import Badge from '@smui-extra/badge';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if $session?.user}
	<LayoutGrid fixedColumnWidth>
		<Cell span={12}>
			<div class="card-container">
				<div class="mdc-elevation--z2">
					<div class="mdc-typography--headline3">Welcome</div>
					<div class="mdc-typography--body1">Welcome {$session?.user.email}</div>
				</div>
			</div>
		</Cell>
		<Cell span={4}>
			<div class="card-container">
				<Card>
					<Content>
						<div class="mdc-typography--headline5">
							<span style="position: relative;">
								Upcoming sessions
								<!-- <Badge aria-label="unread count">3</Badge> -->
							  </span>
							
						</div>
					</Content>
					<Actions fullBleed>
						<Button>
							<Label>Go to sessions</Label>
							<i class="material-icons" aria-hidden="true">arrow_forward</i>
						</Button>
					</Actions>
				</Card>
			</div>
		</Cell>
		<Cell span={4}>
			<div class="card-container">
				<Card>
					<Content>
						<div class="mdc-typography--headline5">Pending invites</div>
					</Content>
					<Actions fullBleed>
						<Button>
							<Label>Go to invites</Label>
							<i class="material-icons" aria-hidden="true">arrow_forward</i>
						</Button>
					</Actions>
				</Card>
			</div>
		</Cell>
		<Cell span={4}>
			<div class="card-container">
				<Card>
					<Content>
						<div class="mdc-typography--headline5">Unread messages</div>
					</Content>
					<Actions fullBleed>
						<Button>
							<Label>Go to messages</Label>
							<i class="material-icons" aria-hidden="true">arrow_forward</i>
						</Button>
					</Actions>
				</Card>
			</div>
		</Cell>
	</LayoutGrid>
{/if}

<style lang="scss">
	@use '@material/typography/mdc-typography';
</style>
