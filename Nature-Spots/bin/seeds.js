// Require Mongoose
const mongoose = require("mongoose");

// Require Book Model
const Nature = require("../models/Nature.model.js");

MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Nature-Spots";

const spots = [
  {
    title: "Mount Kilimanjaro",
    country: "Tanzania",
    continent: "Africa",
    description:
      "Africa’s highest peak seems more striking than a lot of other famous mountains, because it’s an ancient stratovolcano that’s not part of any mountain range. That means the 19,000-foot summit drops down to vast, flat plains on all sides, making it a mirage-like blip on Tanzania’s widespread topography. As an added bonus, the peak requires no technical mountaineering skills to summit, so even novice hikers can cross this item off their bucket list.",
    imageUrl:
      "https://media.cntraveler.com/photos/60596bca7ef97a43a1af2c99/master/w_1920%2Cc_limit/Kilimanjaro-GettyImages-1249566598.jpg",
  },
  {
    title: "Arashiyama Bamboo Grove",
    country: "Japan",
    continent: "Asia",
    description:
      "ReaEvery traveler should experience the ethereal glow and seemingly endless heights of this bamboo grove on the outskirts of Kyoto. The experience even extends beyond the visual realm: In 1996, Japan’s Ministry of the Environment included the sounds here—wood creaking, leaves rustling—as one of the top 100 Soundscapes of Japan.",
    imageUrl:
      "https://media.cntraveler.com/photos/5cb63a091a7e70293bf7094b/master/w_1920%2Cc_limit/Arashiyama-Japan_GettyImages-687644524.jpg",
  },

  {
    title: "Na Pali Coast",
    country: "USA",
    continent: "America",
    description:
      "Kauai has one of the world’s most gorgeous coastlines, with towering waterfalls and isolated crescent beaches. Just be prepared to put in a little effort to soak up its wonders: Na Pali can only be seen from a helicopter, catamaran, or a rather grueling hike.",
    imageUrl:
      "https://media.cntraveler.com/photos/5cb63a2b1a7e7018aef70957/master/w_1920%2Cc_limit/Na-Pali-Coast_GettyImages-1124504102.jpg",
  },

  {
    title: "Reynisfjara",
    country: "Iceland",
    continent: "Europe",
    description:
      "If the moon had a shoreline, it would probably look something like Reynisfjara. Just a 20-minute drive from Vik in southern Iceland, jet-black sand and spectacularly shaped basalt columns make this beach one of the most impressive sites in an already impressive country.",
    imageUrl:
      "https://media.cntraveler.com/photos/60596df48f4452dac88c59fe/master/w_1920%2Cc_limit/Reynisfjara-GettyImages-1004089860.jpg",
  },
  {
    title: "Glowing Beach",
    country: "Maldives",
    continent: "Asia",
    description:
      "Situated in Mudhdhoo Island which is also known as Vaadhoo Island, this unique island is known for its glowing waves that wash over its shores. This natural phenomenon happens due to the presence of millions of bioluminescent microorganisms known as phytoplankton that give the waves fluorescent lighting that looks too surreal to believe. June to October is the best time to catch these glowing waves in full glory when the sea temperature remains comparatively warmer.",
    imageUrl:
      "https://www.namasteindiatrip.com/blog/wp-content/uploads/2021/09/Glowing-Beach-Maldives.jpg",
  },
  {
    title: "Grutas da Moeda",
    country: "Portugal",
    continent: "Europe",
    description:
      "The Grutas da Moeda (the Coin Caves) of São Mamede, Fatima, were discovered in 1971 by two hunters while chasing a fox.The names given to the chambers are very suggestive of the images that each one presents to the visitor: Nativity Scene, Shepherd, Cascade, Virgin, Red Dome, Marine, Flawed Chapel, Wedding Cake and Spring of Tears.",
    imageUrl:
      "https://cdn.visitportugal.com/sites/default/files/styles/encontre_detalhe_poi_destaque/public/mediateca/N4.GRT1074D.jpg?itok=84i-sqiN",
  },
  {
    title: "Everest Base Camp",
    country: "Nepal",
    continent: "Asia",
    description:
      "The Everest Base Camp trek on the south side, at an elevation of 5,364 m (17,598 ft), is one of the most popular trekking routes in the Himalayas and about 40,000 people per year make the trek there from Lukla Airport (2,846 m (9,337 ft)).[5] Trekkers usually fly from Kathmandu to Lukla to save time and energy before beginning the trek to the base camp. However, trekking to Lukla is possible",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sagarmatha_National_Park-Gorak_Shep_to_Pheriche_2013-05-06_08-10-23-2013-05-06_08-11-08.jpg/1920px-Sagarmatha_National_Park-Gorak_Shep_to_Pheriche_2013-05-06_08-10-23-2013-05-06_08-11-08.jpg",
  },
  {
    title: "Reinebringen",
    country: "Norway",
    continent: "Europe",
    description:
      "Reinebringen is located in the Lofoten Islands, far up North in Norway. This idyllic hike is one of the most popular treks in the area, offering views over Reine, Sakrisøy, and Hamnøy fishing villages down below. The hike is only 3 km in distance but will take around 3 hours to complete",
    imageUrl:
      "https://worldofwanderlust.com/wp-content/uploads/2014/10/johny-goerend-U_diPCXCBxU-unsplash-1-scaled.jpg",
  },
  {
    title: "Li River",
    country: "China",
    continent: "Asia",
    description:
      "Fenglin dominates the area around Yangshuo and south of Guilin and is defined as isolated limestone hills separated by a flat limestone surface generally covered by loose sediments, and sometimes described as a peak forest plain",
    imageUrl:
      "https://static.boredpanda.com/blog/wp-content/uploads/2014/03/amazing-places-to-see-before-you-die-1-2.jpg",
  },
  {
    title: "Torres Del Paine",
    country: "Chile",
    continent: "South America",
    description:
      "Torres Del Paine in the South of Chile is one of the most hiked routes in the world. Just one look at that view and it isn’t hard to see why! The ‘W’ trek lasts 4 days and offers travellers some of the best scenery you will find the world over.",
    imageUrl:
      "https://worldofwanderlust.com/wp-content/uploads/2014/09/IMG_0171.jpg",
  },
  {
    title: " Komodo National Park",
    country: " Indonesia",
    continent: "Asia",
    description:
      "These volcanic islands are inhabited by a population of around 5,700 giant lizards, whose appearance and aggressive behaviour have led to them being called 'Komodo dragons'. They exist nowhere else in the world and are of great interest to scientists studying the theory of evolution. The rugged hillsides of dry savannah and pockets of thorny green vegetation contrast starkly with the brilliant white sandy beaches and the blue waters surging over coral.",
    imageUrl:
      "https://www.indonesia.travel/content/dam/indtravelrevamp/en/news-events/news/10-reasons-to-visit-the-magnificent-komodo-national-park/dcd837c723d980d06b0b75b094d316c80bfde1a9-6727f.jpg",
  },
  {
    title: "Great Barrier Reef",
    country: "Australia",
    continent: "Oceania",
    description:
      "Great Barrier Reef, Extensive complex of coral reefs, shoals, and islets in the Pacific Ocean, off the northeastern coast of Australia.It contains the world's largest collection of coral reefs, with 400 types of coral, 1,500 species of fish and 4,000 types of mollusc.",
    imageUrl:
      "https://worldofwanderlust.com/wp-content/uploads/2020/05/salty-wings-PMjffjWSTfE-unsplash-1229x1536.jpg",
  },
  {
    title: "Salar de Uyuni",
    country: "Bolivia",
    continent: "South America",
    description:
      "Salar de Uyuni, amid the Andes in southwest Bolivia, is the world’s largest salt flat. It’s the legacy of a prehistoric lake that went dry, leaving behind a desertlike, nearly 11,000-sq.-km. landscape of bright-white salt, rock formations and cacti-studded islands. Its otherworldly expanse can be observed from central Incahuasi Island. Though wildlife is rare in this unique ecosystem, it harbors many pink flamingos.",
    imageUrl:
      "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSHMRecpn9XnVoMervtyvOnq_8w-Tkrxr2ZHt1_J9yKe0v7MAVF1asdf3ouA1y1G3OY",
  },
  {
    title: "Paricutin",
    country: "Mexico",
    continent: "North America",
    description:
      "Even avid travelers may not know about Paricutin, mainly because this natural wonder resides in Michoacán, Mexico.Paricutin last erupted in 1952. It was coined one of the natural wonders of the world because mankind witnessed its birth and rapidly growing formation",
    imageUrl:
      "https://www.planetware.com/wpimages/2019/11/seven-natural-wonders-of-the-world-paricutin.jpg",
  },
  {
    title: "Harbor of Rio de Janeiro",
    country: "Brasil",
    continent: "South America",
    description:
      "The Harbor of Rio de Janeiro is surrounded by granite mountains and pinnacles covered in greenery.The traditional way of seeing this natural wonder is to travel via the rack railway to Tijuca National Park.For a jaw-dropping experience, explore the Harbor of Rio de Janeiro on a helicopter flight to capture a breathtaking aerial view.",
    imageUrl:
      "https://www.planetware.com/wpimages/2019/11/seven-natural-wonders-of-the-world-harbor-of-rio-de-janeiro.jpg",
  },
  {
    title: "Haleakala National Park",
    country: "Hawaii",
    continent: "Oceania",
    description:
      "The park is also a popular destination for skywatching. The name Haleakalā means “House of the Sun”, and it’s obvious why! With long, sunny days and breathtaking views, visitors often flock to this area to experience the sunrise. Leave our B&B around 4:30 a.m. to give yourself enough time to drive to the summit and set up. Be sure to bring some blankets!",
    imageUrl:
      "https//cdn.outsideonline.com/wp-content/uploads/2022/12/haleakala-crater-slidingsands_h.jpg",
  },
  {
    title: "Azores",
    country: "Portugal",
    continent: "Europe",
    description:
      " The Azores, rising from the ocean atop the Mid-Atlantic Ridge, are in effect a major mountain range. The islands rise steeply from shores lined with rock and pebble debris (scree, or talus)on Pico, the highest point in metropolitan Portugal.The Azores have a subtropical climate with high humidity. An abundant flora of European and Mediterranean origins is found there, and mixed forests still cover many of the islands’",
    imageUrl:
      "https://julesverne.ontigerbay.co.uk/content/Pictures/Pico-Mountain-Azores.jpg",
  },
  {
    title: "Råbjerg Mile",
    country: "Denmark",
    continent: "Europe",
    description:
      "The Dune of Råbjerg Mile is the largest migrating dune in Denmark. You can’t avoid sand in your shoes after a trip in the “mile”, but in return you will be greeted by a sight you will not find anywhere else in Denmark’s beautiful nature.",
    imageUrl:
      "https://naturstyrelsen.dk/media/nst/11706042/larsgundersen_rabjergmile_006.png",
  },
  {
    title: "Mt.Fuji",
    country: "Japan",
    continent: "Asia",
    description:
      "Usually, Mount Fuji impresses with the contrast of the blue mountain range’s peak being covered in white snow. Under certain conditions, it changes its appearance to a crimson color of sublime beauty.Mount Fuji has various different appearances that change with time span and season. Apart from the Red Fuji, there are other rare sceneries of the mountain with curious names.",
    imageUrl:
      "https://www.tripsavvy.com/thmb/qFqPcg6Wo24Hu4fLokNfAZdC-xQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fuji-mountain-in-autumn-822273028-5a6a8a9c3418c600363958d3.jpg",
  },
  {
    title: "Mount Kailash,Kangrinboqe",
    country: "China",
    continent: "Asia",
    description:
      "Ngari is famous for its holy mountain and lake. Kangrinboqe, meaning 'the holy mountain' in Tibetan, is the main peak of the Gangdese Mountains.he peak resembles an olive towering into the sky, with a seven-colored round crown and surrounded by an eight-petal lotus. The whole mountain seems to be made of crystal, looking like a jade-inlaid ice sculpture of extremely skillful craftsmanship.",
    imageUrl:
      "https://images.unsplash.com/photo-1606163338600-0e212c836bb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Naka Cave",
    country: "Thailand",
    continent: "Asia",
    description:
      "Naka Cave is located in Phu Langka National Park which is in the Bueng Khong Long District of Bueng Kan Province, Thailand. Naka means ‘snake’ in the Thai language, and the cave took its name from the texture of some stones in the area, which resembles the scaled skin of a snake.In Buddhist lore, nāgas are half-human, half-serpent beings that live in the netherworld and occasionally take human form. They are considered to be guardians of the water, and often live in damp caves by the water’s edge. ",
    imageUrl:
      "https://www.thailex.info/THAILEX/THAILEXPICS/Naga%20Cave%20and%20Snake%20Head%20Rock,%20Beung%20Kahn%201.jpg",
  },
  {
    title: "Maasai Mara National Reserve",
    country: "Kenya",
    continent: "Africa",
    description:
      "Maasai Mara is one of the most famous and important wildlife conservation and wilderness areas in Africa, world renowned for its exceptional populations of lion, leopard, cheetah and African bush elephant. It also hosts the Great Migration, which secured it as one of the Seven Natural Wonders of Africa, and as one of the ten Wonders of the World.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Masai_Mara_at_Sunset.jpg/1920px-Masai_Mara_at_Sunset.jpg",
  },
  {
    title: "Machu Picchu",
    country: "Peru",
    continent: "south America",
    description:
      "Located high in the Andes mountains of Peru, Machu Picchu is now believed to have been a sacred royal retreat for the Incan rulers. Built in the 15th century CE and abandoned less than 100 years later, the remote site continues to amaze with its perfectly joined, mortarless, intricate stonework. Huge multi-ton blocks of stone are perfectly joined with each other, without the use of mortar or cement.",
    imageUrl:
      "https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/06/1.-Intrepid-Travel-peru_machupicchu.jpg",
  },
  {
    title: "Pokhara",
    country: "Nepal",
    continent: "Asia",
    description:
      "Pokhara’s tranquil beauty has been the subject of inspiration for many travel writers. Its pristine air, spectacular backdrop of snowy peaks, blue lakes and surrounding greenery make it ‘the jewel in the Himalaya’, a place of remarkable natural disposition. With the magnificent Annapurna range forming the backdrop and the serenity of the Cluster of 9 Lakes with three major ones - Phewa, Rupa and Begnas – Pokhara is a great destination for a weekend getaway as well as a long relaxing holiday. Pokhara Valley, gateway to the Annapurna region where many a trekker finds his Shangri-la, sits high on the list of ‘must visit’ places in Nepal.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Pokhara-valley-nepal.jpg/1200px-Pokhara-valley-nepal.jpg",
  },
  {
    title: "The Amazon River",
    country: "Brazil",
    continent: "South America",
    description:
      "One of the most impressive water bodies on Earth, the Amazon is the longest river in South America at over 4,000 miles and has the largest drainage system on the planet, discharging roughly 7,4000,000 cubic feet per second. Whether or not the Nile is, in fact, longer is a point of contention for some as debates rage over the Amazon’s true headwaters",
    imageUrl:
      "https://cdn1.matadornetwork.com/blogs/1/2014/05/Amazon-Rainforest-in-Brazil.jpg",
  },
  {
    title: "Jejy Island",
    country: "south Korea",
    continent: "Asia",
    description:
      "Jeju Island is a volcanic island and province of South Korea that sits to the south of the peninsula between South Korea and Japan. It’s where you’ll find the Jeju Volcanic Island and Lava Tubes, including  both the extensive Geomunoreum lava system and Mount Hallasan (the highest mountain in South Korea).",
    imageUrl:
      "https://cdn1.matadornetwork.com/blogs/1/2014/05/Sunrise-at-Seongsan-Ilchulbong-Jeju-island-South-Korea.jpg",
  },
  {
    title: "Table Moiuntain",
    country: "South Africa",
    continent: "Africa",
    description:
      "Table Mountain is a famous landmark that towers over Cape Town, South Africa. There are some great views of the city from the top (accessible via a hiking trail and cableway). Its main feature is a level plateau that stretches approximately two miles from side to side, edged by impressive cliffs. It’s also a cool place to practice some cloud watching — from afar — as the plateau is often covered by the famous tablecloth clouds.",
    imageUrl:
      "https://cdn1.matadornetwork.com/blogs/1/2014/05/Aerial-view-of-Cape-Town.jpg",
  },
  {
    title: "The Dead Sea",
    country: "Jordan / Israel",
    continent: "Asia",
    description:
      "The Dead Sea, on the border of Jordan and Israel, is one of the saltiest bodies of water in the world. So salty that you can famously float in it and that no macroscopic organisms can survive in it. It was one of the world’s first health resorts (for Herod the Great) and has supplied a wide variety of products, from asphalt for Egyptian mummification to potash for fertilizers. However, it’s receding at an alarming rate.",
    imageUrl:
      "https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/05/View-of-Dead-Sea.jpg",
  },
  {
    title: "Mt.Kilimanjaro",
    country: "Tanzania",
    continent: "Africa",
    description:
      "Kilimanjaro is Africa’s tallest mountain and, as it’s a dormant volcano, the tallest free-standing, or non-massif, mountain in the world. Since Hans Meyer and Ludwig Purtscheller reached its summit in 1889, it has remained a popular climbing destination. It has also been the subject of many scientific studies because of its shrinking glaciers.",
    imageUrl:
      "https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/05/Three-giraffe-on-Kilimanjaro.jpg",
  },
  {
    title: "Angel Falls",
    country: "Venezuela",
    continent: "South America",
    description:
      "The world’s tallest uninterrupted waterfall (at 3,212 feet) is in the jungles of Venezuela and undoubtedly one of the best natural wonders of the world, whether it’s on a list or not. It was not known to the outside world until American aviator Jimmie Angel, following directions given by the explorer Félix Cardona who had seen the waterfall six years before, flew over Angel Falls on November 16, 1933. The falls are named after him.",
    imageUrl:
      "https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/05/Angel-Falls.jpg",
  },
  {
    title: "The Black Forest",
    country: "Germany",
    continent: "Europe",
    description:
      "Germany’s famous Black Forest is famously dense and dark, but it’s also home to the cuckoo clock, charming little towns, and fairytale castles. It’s the place where Hansel and Gretel had their encounter with the witch and where Little Red Riding Hood was followed by the wolf.",
    imageUrl:
      "https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/05/Black-Forest-Germany.jpg",
  },
  {
    title: "The Matterhorn",
    country: "Switzerland",
    continent: "Europe",
    description:
      "The Matterhorn, which rises to 14,692 feet between Italy and Switzerland, is considered one of the most difficult mountains to climb in the world, particularly from the Italian side. While expert rock climbers may be able to summit it, for everyone else, the best way to see it is to take the Matterhorn Gondola from Zermatt. Though if the weather is really nice, you’ll be able to see the Matterhorn from various vantage points around town.",
    imageUrl:
      "https://d36tnp772eyphs.cloudfront.net/blogs/1/2014/05/Zermatt-Switzerland.jpg",
  },
  {
    title: "Yushan",
    country: "Taiwan",
    continent: "Asia",
    description:
      "Yushan is Taiwan’s tallest mountain, sometimes referred to as Jade Mountain. It’s surrounded by a national park of the same name where hikers will find several scenic routes to explore. The trek to the summit is rather arduous at 15 miles and a 6,110-foot gain, and you’ll need to make a reservation to stay at Paiyun Lodge — the only option for sleeping along the route — at least four months in advance. If you don’t plan to hike to the summit, you can get great views of Yushan from almost anywhere within the eponymous Yushan National Park",
    imageUrl:
      "https://cdn1.matadornetwork.com/blogs/1/2014/05/Sunrise-at-Yushan-mountain-Taiwan.jpg",
  },
  {
    title: "Douro Valley",
    country: "Portugal",
    continent: "Europe",
    description:
      "The Douro region is an extensive region that spreads out along the Douro River. It is the home to some of the greatest Portuguese varieties and where the famous port wines were first produced. Utilizing the warm climate and the age-old traditions, the winemakers of Douro have managed to produce consistent table wines and prestigious fortified wine.",
    imageUrl:
      "https://images.winalist.com/blog/wp-content/uploads/2022/04/12193018/vineyard-5649128_1920.jpg",
  },
  {
    title: "ABC Circuit",
    country: "Nepal",
    continent: "Asia",
    description:
      "Annapurna Circuit trek is one of the classic and most rewarding trek in Nepal. The Southern slopes of Manaslu and Annapurna ranges are heavily settled and farmed except the higher regions covered by thick forests of rhododendron and fir. Majority of the people inhabiting this area are Thakalis, Gurungs and Chettris. Thakali people control the busy trading and pilgrimage trail along the Kali Gandaki. One of the most striking significance of this trek is the spectacular view of most mountains range every day.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Under_stars_and_snows.jpg/528px-Under_stars_and_snows.jpg",
  },
  {
    title: "Tilicho Lake",
    country: "Nepal",
    continent: "Asia",
    description:
      "Tilicho Lake is the highest glacial lake, situated at 4,919 meters in the Annapurna Himalayan Ranges. With its sapphire waters and tranquil environment, Tilicho Lake is a famous destination for the Annapurna Circuit Trek. The peaks of Tilicho, Nilgiri, and Khangsar can also be seen from the vicinity of the lake. Tilicho lake is also the site of one of the highest ever altitude scuba dives.",
    imageUrl:
      "https://www.escapehimalaya.com/wp-content/uploads/2017/06/Tilicho-Lake-2.jpg",
  },
  {
    title: "Dhaulagiri Himal",
    country: "Nepal",
    continent: "Asia",
    description:
      "Mount Dhaulagiri is Nepal’s most beautiful mountain massif. Dhaulagiri I is also the seventh highest mountain standing at 8,167 meters. The name of Mount Dhaulagiri comes from the Sanskrit word “dhawala” which means dazzling, white, beautiful and “giri” which means mountain. Dhaulagiri I is also the highest point of the Gandaki River Basin. Dhaulagiri I’s sudden rise from lower terrain is almost unequaled as it rises 7,000m from Kali Gandaki River and 30 km to the southeast.",
    imageUrl:
      "https://www.escapehimalaya.com/wp-content/uploads/2017/06/mountain-2201366_1280.jpg",
  },
  {
    title: "Phoksundo lake",
    country: "Nepal",
    continent: "Asia",
    description:
      "Located in the remote area of Dolpo, trekkers can view more of Nepal’s amazing natural attractions by visiting Phoksundo Lake. The lake is Nepal’s deepest lake storing crystal clear water without any signs of aquatic life living in it.Surrounded by snow-capped mountains, the lake looks tempting to dip a foot or two but visitors should take note that it is a sacred site for Buddhists so swimming and bathing are prohibited in the area.",
    imageUrl: "https://whenonearth.net/wp-content/uploads/Phoksundo-Lake.jpg",
  },
  {
    title: "Tortugario Monterrico",
    country: "Guatemala",
    continent: "South america",
    description:
      "Located along Guatemala’s Pacific coast, Tortugario Monterrico is an important nesting site for olive ridley, leatherback, and green sea turtles.The area also preserves the animals’ natural habitat, including beaches and mangrove swamps, to protect the turtles and their eggs. Visitors can watch the turtles released into the wild at sunrise or sunset from September to January.",
    imageUrl:
      "https://whenonearth.net/wp-content/uploads/Tortugario-Monterrico.jpg",
  },
  {
    title: "Gerês",
    country: "Portugal",
    continent: "europe",
    description:
      "The Peneda-Gerês National Park, in the far northwest of Portugal between Upper Minho and Trás-os-Montes, is the only Portuguese protected area classified as a such.It is a world apart in which human activity and nature are harmoniously integrated, preserving ancient values and traditions clearly evident in the village communities of Pitões das Júnias and Tourém.",
    imageUrl:
      "https://www.ourbigjourney.com/wp-content/uploads/2020/11/sete-lagoas-seven-lagoons-portugal-768x1024.jpg",
  },
  {
    title: "Durmitor National Park",
    country: "Montenegro",
    continent: "Europe",
    description:
      "Famous for being one of the best places to travel in Europe on a budget, this tiny country along the Dalmatian coast also packs a nature loving punch, so much so that I had a hard time deciding which region deserved to be called out as the most scenic places in Europe to visit.Runner up is the Bay of Kotor, a dramatic fjord-like region of crystal clear water and charming old towns built into dramatically arranged mountains. This region is only second fiddle because it's frequently visited by cruise ships and tends to be overcrowded during the day. ",
    imageUrl:
      "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/lf582kwfudm2e69lucno",
  },
  {
    title: "Algarve Coast",
    country: "Portugal",
    continent: "Europe",
    description:
      "This one is for the water babies out there. The Southern Coast of Portugal known as silver coast makes a great shoulder season destination for nature lovers as it stays warmer and sunnier than much of the rest of Europe",
    imageUrl:
      "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/jsnxz6azofjzzu9hxesw",
  },
  {
    title: "Chamonix-Mont-Blanc",
    country: "France",
    continent: "Europe",
    description:
      "Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing. Year-round, cable cars take visitors up to several nearby peaks with panoramic views, including Aiguille du Midi above town, and Pointe Helbronner, across vast glacier fields on the Italian border.",
    imageUrl:
      "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/pr87xo58eovq4y8euqrn",
  },
  {
    title: "Vintgar Gorge and Lake Bohinj",
    country: "Slovenia:",
    continent: "Europe",
    description:
      "Vintgar Gorge is a 1.6 km long gorge in the Julian Alps of Slovenia near Lake Bled.More specifically, the Vintgar Gorge is located on the eastern edge of Triglav National Park, between the the hills of Hom (843 meters) and Boršt (931 meters).The gorge was formed by the eroding force of the Radovna River, which continues to flow through the narrow chasm.  ",
    imageUrl:
      "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/lloetppikzb86ob7ff3o",
  },
  {
    title: "Keukenhof Tulip Fields",
    country: "Netherlands",
    continent: "Europe",
    description:
      "One of the prettiest places in Europe for nature has to be the Netherlands in the spring. It's tricky to time your travels correctly, but the flat, flower-filled country has a lot to offer",
    imageUrl:
      "https://res.cloudinary.com/worldpackers/image/upload/c_limit,f_auto,q_auto,w_1140/gkp7fxxkrjmse2cfuuhg",
  },
  {
    title: "Mount Aso",
    country: "Japan",
    continent: "Asia",
    description:
      "Mt Aso (阿蘇山) with its very large caldera is a volcano that is still active today, and it is famous for three areas in particular. First of all, in the middle of the caldera, you can find Mt Nakadake whose crater you can view from up close. Volcanic gases spout from the crater give you a slightly unsettling, but still amazing view. Near Mt Nakadake you can find a shapely volcanic cone covered in grass. It is not easy to reach by vehicle, but you can hike around the area. ",
    imageUrl:
      "https://blog.japanwondertravel.com/wp-content/uploads/2022/02/aso-g34574d418_1920-1200x797.jpg",
  },
  {
    title: "Hokkaido",
    country: "Japan",
    continent: "Asia",
    description:
      "Japan’s northernmost island Hokkaido is chock full of amazing natural highlights, but for now we want to shine the spotlight on one place in particular;  Shiretoko (知床). This peninsula on the eastern side of the island is a designated national park and it is so remote that large parts of it can only be viewed from a boat. The part of the national park that you can discover by land is inhabited by bears, deer, and foxes. You can also see many pretty waterfalls and lakes, but one of the main attractions is the drift ice that you can see here in the winter.",
    imageUrl:
      "https://blog.japanwondertravel.com/wp-content/uploads/2022/02/drift-ice-g648ece211_1920-1200x675.jpg",
  },
  {
    title: "Phong Nha caves",
    country: "Vietnam",
    continent: "Asia",
    description:
      "he spectacular system of underground rivers and passages still has some Cham altars from the 10th century.Phong Nha Cave and Paradise Cave are the most popular attractions in the national park. Both of these are enjoyable, straightforward half-day tours, easily booked via your hotel. The entry to Phong Nha Cave features a journey along the river, a series of wooden walkways lets you explore safely. If you’re travelling with kids, both of these caves will allow them to join the fun.Phong Nha is an adventurer’s paradise. Millions of years of flooding have chiseled out the world’s largest caves, meandering rivers entwine ancient karsts, and jungle-clad mountains lend an otherworldly atmosphere.",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/15/f3/e2/photo3jpg.jpg?w=1000&h=-1&s=1",
  },
  {
    title: "Lake Baikal",
    country: "Russia",
    continent: "Eurasia",
    description:
      "The beautiful Lake Baikal is the deepest, the oldest, and the cleanest lake in the world. It is 1,642 metres deep and it’s also a home to more than 1,700 different species of plants and animals, from which the two-thirds cannot be found anywhere else. The lake is 25 million years old and has been under UNESCO since 1996. But as massive as all these facts sound, you forget about them as soon as you see the lake in real life.Baikal is so beautiful that it will just leave you speechless and mindless, but very much inspired.",
    imageUrl:
      "https://petapixel.com/assets/uploads/2017/01/baikal3-800x781.jpg",
  },
  {
    title: "Sikhote-Alin",
    country: "Russia",
    continent: "Asia",
    description:
      "If you think that Sikhote-Alin looks so peaceful that nothing can ever happen to you there, beware: this place is a home to Amur tigers, world’s largest felines. In addition to that, Sikhote-Alin is notable for its interesting fauna – here you can find both reindeer, which is typical for taiga, and leopards, which usually live in the tropical areas of our planet.",
    imageUrl:
      "https://whc.unesco.org/uploads/thumbs/site_0766_0003-1000-667-20180226164352.jpg",
  },
  {
    title: "Zion National Park",
    country: "USA",
    continent: "North America",
    description:
      "Found in Utah the park provides various fun activities as well as incredible sites. Among many Kanarra Creek, Subway, Angels Landing and Zion Canyon are the most popular spots. Also horseback riding, canyoneering, climbing and hiking attract adventurous visitors.",
    imageUrl:
      "https://www.pandotrip.com/wp-content/uploads/2016/03/Zion-Photo-by-Joe-Braun.jpg",
  },
  {
    title: "Banff National Park",
    country: "Canada",
    continent: "North America",
    description:
      "The Banff Gondola is famous among travelers. On the one hand, It offers a soothing 8-minute ride to the summit of Sulphur Mountain. Travelers can enjoy the beautiful views of the Bow River Valley and Banff going up the 7,500-foot mountain. On the other hand, more adventurous travelers might prefer hiking one of Alberta’s fabulous 80 trails like ‘The Great Divider.’ This is basically for more experienced trekkers. Or a more moderate 3.6-mile hike up the East End of Rundle (EEOR) Trail, which is equally as beautiful.",
    imageUrl:
      "https://i.shgcdn.com/c91cefce-2aba-4111-abaa-304be7c01eb5/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  },
  {
    title: "Cathedral Grove",
    country: "Canada",
    continent: "North America",
    description:
      "In this park, the walking path is well maintained, and also instructional and public toilets are available over there. Walking through this path will provide you with a magical experience ever, where you would sometimes see massive uprooted trees on some parts of the trail. In other words, it's the one of the best places to visit in Canada for nature lovers.The ancient tree of this park is more than 800 years old, and the tower is well above 70 meters, which seems like pillars holding up to the sky. The funny fact is the largest Douglas Fir is an astounding 76 meters tall in comparison to the Leaning Tower of Pisa which is only about 56 meters tall.",
    imageUrl:
      "https://i.shgcdn.com/debf8624-55be-4245-b51b-fe3e3a06a4de/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  },
  {
    title: "Vancouver Island",
    country: "Canada",
    continent: "North America",
    description:
      "The landscape of this island includes - mountains, rainforest and rugged coastlines. Victoria and Tofino are the two most popular places to visit over there, and they are quite a distance apart. On the way to this road trip, you can stop at Cowichan Valley. This place is known for orchards and wineries, and then at Cathedral Grove for the forestry photo op. The best times to travel there are from March to May and September to November.",
    imageUrl:
      "https://i.shgcdn.com/003d4aba-20b8-42ea-886c-3e32341a95f0/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
  },
  {
    title: "Khao Sok National Park",
    country: "Thailand",
    continent: "Asia",
    description:
      "Khao Sok is a national park about 50 km northeast of Khao Lak. Belonging to the Province of Surat Thani, it is a low mountainous area (the highest point is at 950 metres) covered by the oldest evergreen rainforest in the world. The central area of Khao Sok National Park hosts the manmade Cheow Lan Lake, contained by Ratchaprapha Dam. Like an inland sea, the 165-sq-km lake has the same characteristics as the famous Phang Nga Bay: tall limestone karst formations jutting out from the emerald waters of the lake, with sandstone and mudstone hills covered by vegetation even more diverse than the Amazon. ",
    imageUrl:
      "https://a.cdn-hotels.com/gdcs/production159/d611/83c6118a-9920-4ffe-b6bc-3775955f0b28.jpg?impolicy=fcrop&w=800&h=533&q=medium",
  },
  {
    title: "Virachey National Park",
    country: "Cambodia",
    continent: "Asia",
    description:
      "Virachey National Park is a stunning expanse stretching over 1200 square miles in the northeast of Cambodia. Partially unexplored, the area is home to animals such as elephants, sun bears, and clouded leopards, along with many rare birds. Feel like you’re in a movie as you stroll across the open fields and take in the panoramic beauty. Designated an ASEAN Heritage Park in 2003, Virachey is available to explore through organized trips.",
    imageUrl:
      "https://www.visitsoutheastasia.travel/wp-content/uploads/2021/01/unnamed-38.jpg",
  },
  {
    title: "Inle Lake",
    country: "Myanmar",
    continent: "Asia",
    description:
      "Inle Lake is the attraction for tranquility in Myanmar, famous for its floating villages, gardens, and the local people’s unique way of life, with their living communities based entirely on the water and the Intha fishermen’s one-leg rowing technique. Stunning as the sun dips low in the sky, the lake is a beautiful escape for anyone looking to immerse themselves in peace.",
    imageUrl:
      "https://www.visitsoutheastasia.travel/wp-content/uploads/2021/03/unnamed-56.jpeg",
  },
  {
    title: "Gobi Desert",
    country: "Mongolia",
    continent: "Asia",
    description:
      "The fifth largest desert in the world, the Gobi Desert spreads across both China and Mongolia, specifically the southern portion of the country. It is a stunning site and a great contrast to most other parts of Mongolia; be sure to visit the vast Khongor Sand Dunes while you’re here.",
    imageUrl:
      "https://img.theculturetrip.com/1440x/smart/wp-content/uploads/2016/02/dunhuang-1.jpg",
  },
  {
    title: "Katon-Karagay National Park",
    country: "Kazakhstan",
    continent: "Asia",
    description:
      "Ecosystems of the region have remained almost pristine due to their remoteness and inaccessibility to humans. The Altai Mountains include a variety of landscapes including swamps, forests, meadows and vast tundra. Kokkol Waterfall, the largest one in the East Kazakhstan, is the heritage of the park; with a height which is more than 50 meters. It is located in a very difficult passage near Belukha Mountain. You can get there either by walking or riding a horse. A tourists' trail near the waterfall is popular among travelers heading to the Berel glacier. Yazevy Waterfall is smaller than Kokkol, but its picturesque rocky shores, covered with soft moss and cranberries, will not leave you indifferent to its majestic beauty. Katon-Karagay has been famous for radon springs since ancient times. There are about 400 lakes in the area! And most of them are small with a minor area of up to one square km. The largest lake, Bukhtarma, is located at the headwaters of the Bukhtarma River at the upper border of the forest. The large Rakhmanov Lake is located very close to it. Three larger lakes - Karakol (Yazevoe), Chernovoe and Maraldy, are located on the Listvyaga Ridge. There are many fishes such as Ide and Graylings in the waters of these lakes.",
    imageUrl:
      "https://files.kazakhstan.travel/files/public/201912/12/6894d53659ad4e9a9cb20b7c7fdde5e2/016.jpg",
  },
  {
    title: "Blue Eye",
    country: "Albania",
    continent: "Europe",
    description:
      "The natural wonder of Syri I Kalter or the Blue Eye in Albania is a great place to stop on a journey between Sarande and Gjirokastër. Quite a hike from the bus stop which drops you at the turnoff to the Eye, it’s easier if you have a car or it’s on your tour itinerary. However, you get there, you shouldn’t miss the stunning deep blue and green of the Eye which is the source of the Bistricë River.The brave can swim in the clear waters but be aware the temperature is a chilly 10 degrees Celsius. If you want to stay dry, then climb the few steps to the platform directly above the Blue Eye. From here you can look straight down and see why the Eye is so-called as you watch the waters bubble up towards you and stare down into the dark blue abyss.  ",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5940f2725016e1c79e469470/1579647955015-HQ63Z0FB8VMITF9U2EOK/Natural+Wonders+in+the+Balkans?format=1500w",
  },
  {
    title: "Meteora",
    country: "Greece",
    continent: "Europe",
    description:
      "The landscape of Meteora is so beautiful that it was used in both a James Bond movie and an episode of Game of Thrones, but that’s not why tourists flock here. Instead, the monasteries built on the top of the rock columns are the main attraction.    So high they appear to almost be suspended in air, these monasteries were built by monks intent on living their faith secluded from the influences of the outside world. Today the number of monks has dwindled, and tourism is an integral part of keeping the traditions here alive.",
    imageUrl:
      "https://sofiaadventures.com/wp-content/uploads/2019/01/14917209_1075010889264833_2655315282784318203_o-1024x1024.jpg",
  },
  {
    title: " Banaue Rice Terraces",
    country: "Phillipines",
    continent: "Asia",
    description:
      "in the middle of the mountainous area of Ifugao Province lays the majestic Banaue Rice Terraces, stair-like rice fields that have been around over 2,000 years ago.The Banaue Rice Terraces is actually a cluster of smaller rice terraces, five of which have been recognized by UNESCO as a World Heritage Site. Where else can you visit multiple UNESCO World Heritage Sites all at onc",
    imageUrl:
      "https://blog.tiket.com/wp-content/uploads/2021/11/1.-Banaue-Rice-Terraces-1.jpg",
  },
  {
    title: "Chocolate Hills",
    country: "Phillipines",
    continent: "Asia",
    description:
      "The Chocolate Hills are conical karst hills that scientist believes used to be a garden of corals million years ago. Now, the hills are known as a tourist attraction and are declared as the country’s third National Geological Monument.Grab your camera and head to their viewing deck to get the best angle of the area. If you want to explore the site even further, there is also the famous Twin Hanging Bridge made of bamboo you can pass through.",
    imageUrl:
      "https://blog.tiket.com/wp-content/uploads/2021/11/3.-Chocolate-Hills_collage.jpg",
  },
  {
    title: "Mayon Volcano",
    country: "Phillipines",
    continent: "Asia",
    description:
      "Mount Mayon is by far the most active volcano in the Philippines and it has erupted over 50 times in the past four centuries. Despite that, the government developed the surrounding areas into this big tourist attraction called Mayon Volcano Natural Park where tourists can safely come and sightsee the volcano.",
    imageUrl:
      "https://blog.tiket.com/wp-content/uploads/2021/11/7.-Mount-Mayon.jpg",
  },
  {
    title: "High Atlas Mountains ",
    country: "Morocco",
    continent: "Africa",
    description:
      "Welcome to North Africa’s highest mountain range, known by Imazighen (Berbers) as “Idraren Draren” (Mountains of Mountains), and a trekker’s paradise from spring to autumn. The range runs diagonally across Morocco for almost 625 miles, encircling Marrakesh to the south and east from the Atlantic Coast just north of Agadir to Khenifra in the northeast. Its saw-toothed peaks act as a weather barrier between the mild, Mediterranean climate to the north and the Sahara to the south.",
    imageUrl:
      "https://lp-cms-production.imgix.net/2020-09/GettyRF_505612178.jpg?auto=format&q=75&w=1920",
  },
  {
    title: "Milford Sound",
    country: "New Zealand",
    continent: "Oceania",
    description:
      "Carved by glaciers dating back to the Ice Ages, Milford Sound is considered one of the best natural attractions in New Zealand. The scenery is dynamic; cliffs rise vertically from the navy blue water, the mountain peaks almost seem to touch the sky, and waterfalls cascade dramatically from as high as 1,000 metres.Milford Sound is also one of the wettest places in the world, with rain falling an average of 182 days a year. When it rains, those waterfalls are amplified, creating a louder and more magnificent scene to take in. Hence, some would say it’s better to visit this nature spot during such weather!",
    imageUrl: "https://static.tripzilla.com/thumb/2/e/185134_800x.jpg",
  },
  {
    title: "Kanchenjunga South Base Camp",
    country: "Nepal",
    continent: "Asia",
    description:
      "Exploring the new trail to Kanchenjunga South Base Camp The Covid-19 pandemic lockdown was a disaster for travelers. We were locked up in our homes for months. We could not go out to places like normal times and traveling was out of the question. So as soon as things started getting back to normal and the lockdown was lifted, we, a group of three friends, prepared ourselves to trek after the Tihar of 2078 B.S. (2021 A.D.). This led us to Kanchenjunga South Base Camp in the far east corner of Nepal. ",
    imageUrl:
      "https://i0.wp.com/ghumante.com/wp-content/uploads/2022/08/KBC21-scaled.jpg?resize=1536%2C1152&ssl=1",
  },
  {
    title: "Okavango Delta",
    country: "Botswana",
    continent: "South America",
    description:
      "The mighty Okavango, the largest inland delta in the world, is a vast network of winding waterways and animal-attracting lagoons. Navigating through reed-studded channels in a mokoro (traditional canoe) and spotting hippos, leopards, and elephants is one of the world's great travel experiences for nature lovers.",
    imageUrl:
      "https://www.travelandleisure.com/thmb/Wwx9S2_51d3Ao6JKyPcpisgXuGc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/okavango-delta-botswana-MOSTBEAUTIFUL0921-e3b2c6640eb6481ba891be8b5570d2c3.jpg",
  },
  {
    title: "Shey Phoksundo",
    country: "Nepal",
    continent: "Asia",
    description:
      "Dolpo Shey Phoksundo or in the more typical term ‘Phoksumdo’ is a majestic lake beneath Kanjiralwa Himalayan. The whole region of Dolpa is filled with magical landscapes and scattered pieces of beautiful lands, people and elements (Mountains, Lakes, Hills) are enough to astonish any visitor who embarks on a journey to this mystical land. This specific region lies in the Western part of Nepal.The people. Yes, people might be one of the main reasons we want to go back. They make you feel at home away from home. ",
    imageUrl:
      "https://i0.wp.com/ghumante.com/wp-content/uploads/2021/03/72879400_3594431213904214_4152555221370798080_o.jpg?w=1920",
  },

  {
    title: "Mount Taranaki",
    country: "New Zealand",
    continent: "Oceania",
    description:
      "Mount Taranaki is a dormant stratovolcano in the Taranaki region on the west coast of New Zealand's North Island. At 2,518 metres, it is the second highest mountain in the North Island, after Mount Ruapehu. It has a secondary cone, Fanthams Peak, 1,966 metres, on its south side.Taranaki is geologically young, having commenced activity approximately 135,000 years ago.aranaki once resided in the middle of the North Island, with all the other New Zealand volcanoes.",
    imageUrl: "https://static.tripzilla.com/thumb/3/2/185138_800x.jpg",
  },
  {
    title: "CRADLE MOUNTAIN",
    country: "Australia",
    continent: "Oceania",
    description:
      "A place for all seasons, discover deep snowdrifts in winter, spectacular displays of yellows, oranges and reds across the mountain slopes in autumn as Tasmania’s deciduous Fagus turns colour, playful young joeys and​ hungry echidnas emerging in spring, and the fragrance of wildflowers filling the air as you dip your toe into a crystal-clear lake on a summer’s day.Cradle Mountain is synonymous with nature, wilderness and all things pristine. Wildlife is in abundance in this spectacular national park, giving opportunity to encounter Tasmanian devils, quolls, platypus, echidna, wombats and the highly inquisitive black currawong.",
    imageUrl:
      "https://www.discovertasmania.com.au/siteassets/places-to-go/north-west/guide-to-cradle/136558.jpg?resize=AnnTrVkiYwQraX4siYwzeH8pd3xbO9dFt5msbhNovWqxF6_7T8IkEvw8T2brcyvYcuTpXc1Ln9TGr-iZJJ6US3Pv0VWBevlOsm7bllVzMJU",
  },
  {
    title: "Faroe Island",
    country: "Faore island",
    continent: "Europe",
    description:
      "“Góðan dag”Come and experience what the Faroe Islands have to offer.Although the Faroe Islands are one of the safest countries in the world, travelling in the Faroe Islands might be different to what you are used to. It is important you are well aware of things like weather extremes, narrow, windy roads and different road rules before you begin your journey.",
    imageUrl:
      "https://visitfaroeislands.com/download/e14ff46ccb2140338fc0b076e74e4974_large.jpeg",
  },
  {
    title: "Glencoe",
    country: "Scotland",
    continent: "Europe",
    description:
      "The Scottish Highlands are filled with astonishingly scenic glens, but Glencoe is perhaps the most famous (and infamous, due to a brutal 17th-century massacre). Today the valley is a haven for hikers, mountaineers, and whiskey lovers — the 19th-century Ben Nevis Distillery is a short drive away.",
    imageUrl:
      "https://www.travelandleisure.com/thmb/aI8SDQ03Ey3JerZAtCYsZPGW68c=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/glencoe-scotland-MOSTBEAUTIFUL0921-3e33457bc6cf4bdebc9e58d77dc0a420.jpg",
  },

  {
    title: "Mustang Valley",
    country: "Nepal",
    continent: "Asia",
    description:
      "We travelled along this river from the green, rainy side of the Himalaya to the dry, high-altitude desert on the northern side. In the space of a few kilometres the world changes from green to brown. This is where Mustang starts.Mustang, one of the world’s most mystical places. Mustang, a kingdom along a caravan route between the barren Tibetan plateau and the lush green plains of Nepal.",
    imageUrl:
      "https://i0.wp.com/ghumante.com/wp-content/uploads/2015/08/91.jpg?w=1920",
  },
  {
    title: "Vatnajökull",
    country: "Iceland",
    continent: "Europe",
    description:
      "Dominated by a 3,000-square-mile ice cap of the same name, Vatnajökull is a chilly, Icelandic wonderland of caves, craters, glacier-filled calderas, and waterfalls. Perhaps the most famous falls is Svartifoss, surging over hexagonal lava-rock columns",
    imageUrl:
      "https://www.travelandleisure.com/thmb/578gyX96prlLDCxNNMiFTlSteGA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vatnajokull-national-park-iceland-MOSTBEAUTIFUL0921-321326d1ae074e52be76aa38427c586a.jpg",
  },
  {
    title: "Avenue of the Baobabs,",
    country: "Madagascar",
    continent: "Africa",
    description:
      "On a dirt road near Madagascar's west coast is a stretch of enormous baobab trees, all that remains of a once-dense forest. The centuries-old giants are especially magnificent cast in the light of a sunrise and sunset.",
    imageUrl:
      "https://www.travelandleisure.com/thmb/WtI4VOVxh8Cl2TN2Yh47455fBA8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/avenue-of-the-baobabs-madagascar-MOSTBEAUTIFUL0921-9018225e787e4539b1294976f7a2baf4.jpg",
  },
  {
    title: "Bagan",
    country: "Myanmar",
    continent: "Asia",
    description:
      "It's hard to truly grasp the magnitude of Bagan Archaeological Zone, dominated by thousands of temples, pagodas, and stupas. Explore the UNESCO World Heritage Site on a bike (or e-bike to cover even more ground). For an eagle's-eye view, take a hot-air balloon ride at sunrise to see the temples scattered across the lush landscape.",
    imageUrl:
      "https://www.travelandleisure.com/thmb/ho-fEQMuBJm2iMTZlRfw2Rterro=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bagan-myanmar-MOSTBEAUTIFUL0921-7de032dd5a894dbc970896d65fc0283b.jpg",
  },
  {
    title: "Le Morne Brabant",
    country: "Mauritius",
    continent: "Africa",
    description:
      "A freestanding basaltic mountain hulking over a bright blue-green Indian Ocean lagoon certainly makes spectacular scenery. When viewed from above, the surrounding sand and silt form an optical illusion that appears to be a massive underwater waterfall at this mythic place. Thanks to its isolation and near-inaccessibility, Le Morne sheltered people who escaped enslavement during the 18th and early 19th centuries.",
    imageUrl:
      "https://www.travelandleisure.com/thmb/WLNYXcfloCFv-R0GZ1XdqVk6biI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/aerial-le-morne-brabant-mauritius-UNDERWATERFALL0417-3d01a7cc5c28428daaa25a702d6bd90c.jpg",
  },
  {
    title: "Madeira Island",
    country: "Portugal",
    continent: "Europe",
    description:
      "With exceptional natural beauty, a mild climate throughout the year, a friendly population, and a top-quality hotel network, Madeira and Porto Santo, the two inhabited islands of the Madeira archipelago, are the perfect islands for those seeking stress-free holidays. Here you can enjoy your holiday on the beach or at sea, in the mountains, in the countryside or in the city–the perfect spot for a getaway to experience unique moments like nowhere else.",
    imageUrl:
      "https://image.arrivalguides.com/1500x600/11/cac9511b316141033773bb85a9f1875d.jpg",
  },
  {
    title: "Taal Volcano and Taal Lake",
    country: "Phillipines",
    continent: "Asia",
    description:
      "Although Taal Volcano has been dubbed as the world’s smallest volcano, it is also on the list of one of the world’s most dangerous ones. So if you’re planning on going here, make sure you’re with a guide and do some research beforehand.Situated 2 hours away from Manila, Taal Volcano is an active volcano with over 40 craters and 4 maars. The volcano also has a lake with alluring scenery named Taal Lake. From here, there is a viewpoint where you can see the entire surrounding nature of the volcano.",
    imageUrl:
      "https://blog.tiket.com/wp-content/uploads/2021/11/9.-Taal-Volcano-and-Taal-Lake-1.jpg",
  },
];
async function insertSpots() {
  try {
    let db = await mongoose.connect(MONGO_URI);
    // Feedback about the connection
    console.log(`Connected to Mongo Database: ${db.connections[0].name}`);
    // Create new documents inside books collection
    let spotsCreated = await Nature.create(spots);
    // Feeback regarding to books creation
    console.log(`Created ${spotsCreated.length} Spots!`);
    // Closing the connection
    await mongoose.connection.close();
  } catch (error) {
    console.log("An error occurred while connecting to Db", error);
  }
}

insertSpots();
