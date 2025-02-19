import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';
import payementRoutes from './routes/payment.route.js';
import analyticsRoutes from './routes/analytics.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' })); //alllows to parse the body of the request
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/payments', payementRoutes);
app.use('/api/analytics', analyticsRoutes);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'frontend/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
	});
}

app.listen(5000, () => {
	console.log('Server is running on http://localhost : ' + PORT);
	connectDB();
});
