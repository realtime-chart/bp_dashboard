var cube_queue = new Array;

var stats = {
	total_amount: 0,
	total_amount_euro: 0,
}

function addDonation(amount, codonation){
	stats.total_amount += amount;
	stats.total_amount_euro = (stats.total_amount / 100).toFixed(2);
	var amount_in_cubes = Math.floor((amount / config.cents_per_block));
	for(n=0; n<=amount_in_cubes; n++){
		cube_queue.push(codonation);
	}	
}
