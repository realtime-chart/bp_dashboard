var cube_queue = new Array;

var stats = {
	total_amount: 0,
	total_number: 0,
	total_number_displayed: 0,
	total_amount_display_growrate: 42,
	total_amount_displayed: 0,
}

function addDonation(amount, codonation){
  if(amount){
	  stats.total_amount += amount;
	  stats.total_number += 1;
	  var amount_in_cubes = Math.floor((amount / config.cents_per_block));
	  for(n=0; n<=amount_in_cubes; n++){
		  cube_queue.push(!codonation);
	  }	
	}
}

function updateStatsDisplay(){
	if(stats.total_amount > (stats.total_amount_displayed+stats.total_amount_display_growrate)){		
		stats.total_amount_displayed += stats.total_amount_display_growrate;
		var total_amount_euro = (stats.total_amount_displayed / 100).toFixed(2);
		$('.stat_total_amount').html(total_amount_euro);
	}
	if(stats.total_number > stats.total_number_displayed){
		stats.total_number_displayed += 0.2;
		$('.stat_total_number').html(Math.floor(stats.total_number_displayed));
	}
}
