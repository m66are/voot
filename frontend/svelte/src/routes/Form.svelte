<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import axios from 'axios';

	let input1 = '';
	let input2 = '';
	let input3 = '';
	// @ts-ignore
	let responseData = [];
const sendData = async () => {
		try {
			let response = await axios.post('http://localhost:3000/car/add', {
				name: input1,
				price: input2,
				image_url: input3
			},
            );
			responseData = response.data;
			refreshData(); // Refresh data after sending new data
		} catch (error) {
			console.error(error);
		}
	};

	const refreshData = async () => {
		try {
			const response = await axios.get('http://localhost:3000/cars');
			responseData = response.data;
		} catch (error) {
			console.error(error);
		}
	};

	onMount(() => {
		refreshData();
	});
</script>

<!-- CSS styles -->

<main>
	<form on:submit|preventDefault={sendData}>
		<label>
			Car name:
			<input type="text" bind:value={input1} />
		</label>

		<label>
			Price:
			<input type="text" bind:value={input2} />
		</label>

		<label>
			Image:
			<input type="text" bind:value={input3} />
		</label>

		<button type="submit">Send Data</button>
	</form>

	<button on:click={refreshData}>Refresh Data</button>

	<div>
		<h2>Response Data:</h2>
		<div class="card-container">
			{#each responseData as car}
				<div class="card">
					<div class="image-container">
						<img src={car.image_url} alt={car.name} />
					</div>
					<div class="details-container">
						<h3>{car.name}</h3>
						<p>Price: ${car.price}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	}

	label {
		margin-bottom: 10px;
	}

	input {
		margin-top: 5px;
		padding: 5px;
		width: 200px;
	}

	button {
		padding: 10px 20px;
		margin-top: 10px;
		background-color: #007bff;
		color: white;
		border: none;
		cursor: pointer;
	}

	div {
		background-color: #f8f9fa;
		padding: 20px;
		border-radius: 5px;
		width: 300px;
	}

	h2 {
		margin-bottom: 10px;
	}



	.card-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.card {
		width: 250px;
		margin: 20px;
		padding: 20px;
		border: 1px solid #ddd;
		border-radius: 10px;
		text-align: center;
	}

	.image-container {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		overflow: hidden;
		margin: 0 auto 20px;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.details-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.details-container h3 {
		font-size: 18px;
		margin-bottom: 10px;
	}

	.details-container p {
		font-size: 14px;
		color: #888;
	}
</style>
