<script lang="ts">
	// Import resume.json
	import resumeJson from '$lib/assets/resume.json';
	import BackgroundGlows from '$lib/components/BackgroundGlows.svelte';
	import ResumeCard from '$lib/components/ResumeCard.svelte';

	// States
	let copied = $state(false);
	let isMaximized = $state(false);

	// Format JSON data
	function formatJson<T>(jsonData: T) {
		return JSON.stringify(jsonData, null, 2);
	}

	let formattedJson = $derived(formatJson(resumeJson));

	// Functions
	function copyToClipboard() {
		navigator.clipboard.writeText(formattedJson);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function toggleMaximize() {
		isMaximized = !isMaximized;
	}
</script>

<main
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#13111C] p-4"
>
	<!-- Background glows -->
	<BackgroundGlows />

	<!-- Content -->
	<ResumeCard {isMaximized} {copied} {formattedJson} {copyToClipboard} {toggleMaximize} />
</main>
