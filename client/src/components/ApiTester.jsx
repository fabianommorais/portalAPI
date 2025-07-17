import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Button, TextField, Select, MenuItem, Box, Paper, Typography } from '@mui/material';

export default function ApiTester() {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const { register, handleSubmit, control } = useForm({
		defaultValues: {
    method: 'GET',
    url: '',
    token: '',
    headers: '',
    body: '',
  }
	});

	const method = useWatch({ control, name: 'method', defaultValue: 'GET' });

	const { t } = useTranslation();

	const METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

	const safeJsonParse = (str, fallback = {}) => {
		try {
			return str ? JSON.parse(str) : fallback;
		} catch (e) {
			return fallback;
		}
	};

	const onSubmit = async (data) => {
		setLoading(true);
		setResponse(null);

		try {
			const res = await axios.post('https://localhost:5000/api/proxy', {
				method: data.method,
				url: data.url,
				headers: safeJsonParse(data.headers),
				body: (data.method === 'POST' || data.method === 'PUT') ? safeJsonParse(data.body, null) : null,
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
				status: error.response?.status,
				error: error.response?.data || error.message
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 500 }}>
			<Typography
				variant='h4'
				component={"h1"}
				gutterBottom
				align='center'
				fontWeight={"bold"}
			>
				{t('title') || 'Testador de API'}
			</Typography>
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
						label={t('url') || "URL da API"}
						placeholder={t('urlPlaceholder') || "https://api.exemplo.com/dados"}
						required
						fullWidth
					/>
				</Box>

				<Box mb={2}>
					<TextField
						{...register('token')}
						label={t('token') || "Token (Opcional)"}
						placeholder={t('tokenPlaceholder') || "Bearer token"}
						fullWidth
					/>
				</Box>

				<Box mb={2}>
					<TextField
						{...register('headers')}
						label={t('headers') || "Headers (JSON)"}
						placeholder='{"Content-Type": "application/json"}'
						multiline
						rows={2}
						fullWidth
					/>
				</Box>

				{['POST', 'PUT'].includes(method || '') && (
					<Box mb={2}>
						<TextField
							{...register('body')}
							label={t('bodyLabel') || "Corpo (JSON - POST/PUT)"}
							multiline
							rows={4}
							fullWidth
						/>
					</Box>
				)}

				<Button
					type="submit"
					variant="contained"
					disabled={loading}
					startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
				>
					{loading ? (t('sending') || 'Enviando...') : (t('button') || 'Enviar Requisição')}
				</Button>
			</form>

			{response && (
				<Box mt={4}>
					<Typography variant="h6" color={response.error ? 'error' : 'primary'}>
						{response.status ? `Status: ${response.status}` : 'Erro'}
					</Typography>
					<Paper elevation={1} sx={{ p: 2, mt: 1, overflowX: 'auto', bgcolor: '#f9f9f9' }}>
						<pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
							{JSON.stringify(response.error || response.data, null, 2)}
						</pre>
					</Paper>
				</Box>
			)}
		</Paper>
	);
}