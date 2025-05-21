document.addEventListener('DOMContentLoaded', () => {
	fetch('/assets/data/games.json')
	  .then(response => response.json())
	  .then(data => {
		const container = document.getElementById('games-container');
  
		for (const console in data) {
		  data[console].forEach(game => {
			const gameHTML = `
			  <div class="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 console cards ${console}">
				<div class="item">
				  <div class="thumb">
					<a href="product-details.html?id=${game.id}">
					  <img src="${game.image}" alt="${game.name}">
					</a>
				  </div>
				  <div class="down-content">
					<span class="category">${game.genre}</span>
					<h4>${game.name}</h4>
					<a href="product-details.html?id=${game.id}"><i class="fa fa-shopping-bag"></i></a>
				  </div>
				</div>
			  </div>
			`;
			container.insertAdjacentHTML('beforeend', gameHTML);
		  });
		}
  
		// ✅ Initialize Isotope after cards are in the DOM
		const elem = document.querySelector('.trending-box');
		const filtersElem = document.querySelector('.trending-filter');
  
		const rdn_events_list = new Isotope(elem, {
		  itemSelector: '.trending-items',
		  layoutMode: 'masonry'
		});
  
		if (filtersElem) {
		  filtersElem.addEventListener('click', function(event) {
			if (!matchesSelector(event.target, 'a')) {
			  return;
			}
  
			const filterValue = event.target.getAttribute('data-filter');
			rdn_events_list.arrange({
			  filter: filterValue
			});
  
			filtersElem.querySelector('.is_active').classList.remove('is_active');
			event.target.classList.add('is_active');
			event.preventDefault();
		  });
		}

         // ✅ Initialize VanillaTilt here, after dynamic content is added
            VanillaTilt.init(document.querySelectorAll(".cards"), {
            max: 15,
            speed: 400,
            scale: 1.05,
            glare: true,
            "max-glare": 0.2,
        });
  
	  });
  });
  



  // other console game list: 
//   "ps5": [
//     {
//       "id": "ps5-godofwar",
//       "name": "God of War: Ragnarok",
//       "genre": "Action",
//       "image": "assets/images/ps5-godofwar.jpg",
//       "oldPrice": "$50",
//       "newPrice": "$40"
//     }
//   ],
//   "ps4": [
//     {
//       "id": "ps4-spiderman",
//       "name": "Spider-Man: Miles Morales",
//       "genre": "Adventure",
//       "image": "assets/images/ps4-spiderman.jpg",
//       "oldPrice": "$45",
//       "newPrice": "$35"
//     }
//   ],
//   "xbx360": [
//     {
//       "id": "xbx360-halo3",
//       "name": "Halo 3",
//       "genre": "Shooter",
//       "image": "assets/images/xbx360-halo3.jpg",
//       "oldPrice": "$30",
//       "newPrice": "$20"
//     }
//   ],
//   "ntn": [
//     {
//       "id": "ntn-zelda",
//       "name": "The Legend of Zelda: Breath of the Wild",
//       "genre": "RPG",
//       "image": "assets/images/ntn-zelda.jpg",
//       "oldPrice": "$60",
//       "newPrice": "$50"
//     }
//   ],