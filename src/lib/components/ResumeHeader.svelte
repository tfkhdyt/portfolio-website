<script lang="ts">
	let {
		copied,
		isMaximized,
		copyToClipboard,
		toggleMaximize,
		onpointerdown
	}: {
		copied: boolean;
		isMaximized: boolean;
		copyToClipboard: () => void;
		toggleMaximize: () => void;
		onpointerdown: (e: PointerEvent) => void;
	} = $props();
</script>

<div
	class="flex items-center justify-between border-b border-white/[3%] px-3 py-1.5 select-none {isMaximized
		? ''
		: 'cursor-grab active:cursor-grabbing'}"
	{onpointerdown}
	style="touch-action: none"
>
	<!-- Copy Button -->
	<div class="relative">
		<button
			onclick={copyToClipboard}
			class="rounded-lg p-1.5 text-gray-500 transition-all duration-150 hover:scale-105 hover:bg-white/10 hover:text-white active:scale-95 active:bg-white/15"
			aria-label="Copy JSON"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
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
		</button>
		<!-- Copied toast -->
		<div
			class="absolute top-full left-1/2 mt-1 -translate-x-1/2 rounded-md bg-gray-800 px-2 py-0.5 text-[11px] whitespace-nowrap text-gray-300 shadow-lg transition-all {copied
				? 'scale-100 opacity-100'
				: 'pointer-events-none scale-90 opacity-0'}"
		>
			Copied!
		</div>
	</div>

	<span class="text-xs font-medium tracking-wide text-gray-500"> resume.json </span>

	<!-- Toggle Button -->
	<button
		onclick={toggleMaximize}
		class="rounded-lg p-1.5 text-gray-500 transition-all duration-150 hover:scale-105 hover:bg-white/10 hover:text-white active:scale-95 active:bg-white/15"
		aria-label={isMaximized ? 'Minimize' : 'Maximize'}
	>
		{#if isMaximized}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
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
				width="15"
				height="15"
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
