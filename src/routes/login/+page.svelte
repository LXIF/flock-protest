<script>
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
    import BlurTainer from '$lib/components/layout/BlurTainer.svelte';
    export let form;

    let wrongPassword = false;

    $: if(form?.body.success) {
        goto('/control');
    } else if(form?.body.success === false) {
        wrongPassword = true;
    }
</script>

<div class="flex items-center justify-center h-screen">
    <BlurTainer>
        <form use:enhance method="POST" action="?/login">
            <label>
                Password:
                <input class="rounded-full px-4 py-2" name="password" type="password">
            </label>
            <br/>
            <div class="flex w-full justify-center">
                <button class="px-4 py-2 mt-10 bg-black text-white text-lg font-bold rounded-full">Log in</button>
            </div>
        </form>
        {#if wrongPassword}
            <p class="bg-red-600 text-center mt-2 px-4 py-2 rounded-full">Wrong password!</p>
        {/if}
    </BlurTainer>
</div>