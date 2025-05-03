<script lang="ts">
	import Highlight from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import 'svelte-highlight/styles/atom-one-dark.css';

	let { formattedJson }: { formattedJson: string } = $props();
</script>

<div
	class="custom-scrollbar flex-1 overflow-x-hidden overflow-y-auto p-2 font-mono text-sm transition-all duration-300 ease-in-out selection:bg-slate-700/50 xl:text-base"
>
	<Highlight language={json} code={formattedJson} />
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 8px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	:global(.hljs) {
		background: transparent !important;
		white-space: pre-wrap !important;
	}
</style>
