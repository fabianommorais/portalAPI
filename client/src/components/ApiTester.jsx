import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, Box, Paper, Typography } from '@mui/material';

export default function ApiTester() {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit } = useForm();

	const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

	const onSubmit = async (data) => {
		setLoading(true);

		try {
			const res = await axios.post('https://localhost:5000/api/proxy', {
				method: data.method,
				url: data.url,
				headers: JSON.parse(data.headers || '{}'),
				body: data.body ? JSON.parse(data.body) : {},
				auth: {
					token: data.token
				}
			});

			setResponse({
				status: res.status,
				data: res.data
			});
		} catch (error) {
			setResponse({
				error: error.response?.data || error.message
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Paper elevation={3} sx={{ p: 3 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box mb={2}>
					<Select
						{...register('method')}
						defaultValue="GET"
						fullWidth
					>
						{METHODS.map(method => (
							<MenuItem key={method} value={method}>{method}</MenuItem>
						))}
					</Select>
				</Box>

				<Box mb={2}>
					<TextField
						{...register('url')}
						label="URL da API"
						placeholder="https://api.exemplo.com/dados"
						required
						fullWidth
					/>
				</Box>

				<Box mb={2}>
					<TextField
						{...register('token')}
						label="Token (Opcional)"
						placeholder="Bearer token"
						fullWidth
					/>
				</Box>

				<Box mb={2}>
					<TextField
						{...register('headers')}
						label="Headers (JSON)"
						placeholder='{"Content-Type": "application/json"}'
						multiline
						rows={2}
						fullWidth
					/>
				</Box>

				<Box mb={2}>
					<TextField
						{...register('body')}
						label="Corpo (JSON - POST/PUT)"
						multiline
						rows={4}
						fullWidth
					/>
				</Box>

				<Button
					type="submit"
					variant="contained"
					disabled={loading}
				>
					{loading ? 'Enviando...' : 'Enviar Requisição'}
				</Button>
			</form>

			{response && (
				<Box mt={4}>
					<Typography variant="h6">Resposta:</Typography>
					<Paper elevation={1} sx={{ p: 2, mt: 1, overflowX: 'auto' }}>
						<pre>{JSON.stringify(response, null, 2)}</pre>
					</Paper>
				</Box>
			)}
		</Paper>
	);
}