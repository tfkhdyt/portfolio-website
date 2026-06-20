<script lang="ts">
	// Import resume.json
	import resume from '$lib/assets/resume.json';
	import BackgroundGlows from '$lib/components/BackgroundGlows.svelte';
	import ResumeCard from '$lib/components/ResumeCard.svelte';
	import Metadata from '$lib/components/Metadata.svelte';

	let { data } = $props();

	// Constants
	const pageTitle = 'Taufik Hidayat - Vibe Coding Cleanup Specialist';
	const pageDescription = resume.data.introduction;
	const siteName = "Taufik Hidayat's Portfolio";

	// States
	let copied = $state(false);
	let isMaximized = $state(false);

	let formattedJson = $derived(JSON.stringify(resume, null, 2));

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

<Metadata {pageTitle} {pageDescription} origin={data.origin} {siteName} />

<main
	class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0f0f11] to-[#16161a] md:p-4"
>
	<!-- Background glows -->
	<BackgroundGlows />

	<!-- Content -->
	<ResumeCard {isMaximized} {copied} {formattedJson} {copyToClipboard} {toggleMaximize} />
</main>
