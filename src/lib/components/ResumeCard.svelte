<script lang="ts">
	import JsonContent from './JsonContent.svelte';
	import ResumeHeader from './ResumeHeader.svelte';

	let {
		isMaximized,
		copied,
		formattedJson,
		copyToClipboard,
		toggleMaximize
	}: {
		isMaximized: boolean;
		copied: boolean;
		formattedJson: string;
		copyToClipboard: () => void;
		toggleMaximize: () => void;
	} = $props();
</script>

<div
	class="fixed z-50 transition-all duration-300 ease-in-out {isMaximized
		? 'inset-4 md:inset-8'
		: 'inset-[5%] mt-44 md:inset-[20%] md:mt-8 xl:inset-[25%] xl:-mt-24'}"
>
	<div
		class="relative overflow-hidden rounded-xl border border-white/10 bg-slate-600/25 shadow-xl backdrop-blur-md transition-all duration-300 ease-in-out {isMaximized
			? 'h-full'
			: 'h-[50vh] md:h-[50vh] xl:h-[70vh]'}"
	>
		<div class="relative z-10 flex h-full flex-col">
			<!-- Card Header -->
			<ResumeHeader {copied} {isMaximized} {copyToClipboard} {toggleMaximize} />

			<!-- JSON Content -->
			<JsonContent {formattedJson} />
		</div>
	</div>
</div>
