<script lang="ts">
	import clsx from 'clsx';

	let {
		copied,
		isMaximized,
		copyToClipboard,
		toggleMaximize
	}: {
		copied: boolean;
		isMaximized: boolean;
		copyToClipboard: () => void;
		toggleMaximize: () => void;
	} = $props();
</script>

<div class="relative flex items-center border-b border-white/10 px-4 py-2">
	<!-- Copy Button -->
	<button
		onclick={copyToClipboard}
		class="absolute left-4 cursor-pointer rounded p-1 text-gray-400 transition-colors hover:text-white"
		aria-label="Copy JSON"
	>
		<!-- Copy Icon -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
		</svg>
		<span
			class={clsx(
				'absolute top-1 left-10 text-xs transition-opacity',
				copied ? 'opacity-100' : 'opacity-0'
			)}
		>
			{copied ? 'Copied!' : ''}
		</span>
	</button>

	<span class="mx-auto text-sm font-medium text-gray-400"> resume.json </span>

	<!-- Toggle Button -->
	<button
		onclick={toggleMaximize}
		class="absolute right-4 cursor-pointer rounded p-1 text-gray-400 transition-colors hover:text-white"
		aria-label={isMaximized ? 'Minimize' : 'Maximize'}
	>
		<!-- Maximize/Minimize Icon -->
		{#if isMaximized}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="4 14 10 14 10 20"></polyline>
				<polyline points="20 10 14 10 14 4"></polyline>
				<line x1="14" y1="10" x2="21" y2="3"></line>
				<line x1="3" y1="21" x2="10" y2="14"></line>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="15 3 21 3 21 9"></polyline>
				<polyline points="9 21 3 21 3 15"></polyline>
				<line x1="21" y1="3" x2="14" y2="10"></line>
				<line x1="3" y1="21" x2="10" y2="14"></line>
			</svg>
		{/if}
	</button>
</div>
