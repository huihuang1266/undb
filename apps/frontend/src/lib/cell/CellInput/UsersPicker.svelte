<script lang="ts">
	import { Button, Checkbox, Dropdown } from 'flowbite-svelte'
	import CollaboratorComponent from '../CellComponents/CollaboratorComponent.svelte'
	import { trpc } from '$lib/trpc/client'
	import { t } from '$lib/i18n'
	import type { ICollaboratorProfile } from '@undb/core'

	export let value: string[] | undefined
	export let initialMembers: Map<string, ICollaboratorProfile & { userId: string }> = new Map()

	$: membersMap = new Map(initialMembers)

	let open = false
	let opened = false

	$: if (!value) {
		value = []
	}

	$: if (open) {
		opened = true
	}

	$: query = trpc().user.users.query({}, { enabled: opened })
	$: members = $query.data?.users ?? []

	$: {
		for (const member of members) {
			membersMap.set(member.userId, {
				userId: member.userId,
				avatar: member.avatar ?? null,
				username: member.username,
				color: member.color,
			})
		}
	}

	$: selected = value?.map((userId) => membersMap.get(userId)!).filter(Boolean) ?? []
</script>

<Button color="alternative" class="inline-flex gap-3 max-h-10 max-w-max">
	{#if selected.length}
		{#each selected as member}
			<CollaboratorComponent username={member.username} avatar={member.avatar} color={member.color} />
		{/each}
	{:else}
		{$t('Select Collaborator')}
	{/if}
</Button>
<Dropdown bind:open>
	{#each members as member}
		{@const isSelected = selected.some((s) => s.userId === member.userId)}
		<Checkbox bind:group={value} value={member.userId} custom>
			<span class="inline-flex items-center justify-between px-4 py-2 cursor-pointer w-full hover:bg-gray-100">
				<CollaboratorComponent username={member.username} avatar={member.avatar} color={member.color} />
				{#if isSelected}
					<i class="ti ti-check" />
				{/if}
			</span>
		</Checkbox>
	{/each}
</Dropdown>
