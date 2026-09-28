const fs = require('fs');
const Razorpay = require('razorpay');

const env = fs.readFileSync('.env.local', 'utf8');
const keyIdMatch = env.match(/RAZORPAY_KEY_ID=(.+)/);
const keySecretMatch = env.match(/RAZORPAY_KEY_SECRET=(.+)/);

const key_id = keyIdMatch ? keyIdMatch[1].trim() : '';
const key_secret = keySecretMatch ? keySecretMatch[1].trim() : '';

console.log('Using Razorpay Key:', key_id);

const instance = new Razorpay({ key_id, key_secret });

async function getPayments() {
  try {
    const payments = await instance.payments.all({ count: 20 });
    console.log(`Fetched ${payments.items.length} payments:`);
    for (const item of payments.items) {
      console.log('------------------------------------');
      console.log('ID:', item.id);
      console.log('Amount:', item.amount / 100, item.currency);
      console.log('Status:', item.status);
      console.log('Email:', item.email);
      console.log('Contact:', item.contact);
      console.log('Created At:', new Date(item.created_at * 1000).toISOString());
      console.log('Description:', item.description);
      console.log('Order ID:', item.order_id);
      console.log('Notes:', item.notes);
      
      // If order_id exists, fetch order details to see notes
      if (item.order_id) {
        try {
          const order = await instance.orders.fetch(item.order_id);
          console.log('Order Notes:', order.notes);
        } catch (e) {
          console.error('Failed to fetch order', item.order_id, e.message);
        }
      }
    }
  } catch (err) {
    console.error('Razorpay API Error:', err);
  }
}

getPayments();
