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
      "https://www.prideofmaui.com/blog/wp-content/uploads/2014/09/Top-10-Places-to-Visit-in-Hawaii_Na-Pali-Coast_1-960x540.jpg",
  },
  {
    title: "Azores",
    country: "Portugal",
    continent: "Europe",
    description:
      " The Azores, rising from the ocean atop the Mid-Atlantic Ridge, are in effect a major mountain range. The islands rise steeply from shores lined with rock and pebble debris (scree, or talus)on Pico, the highest point in metropolitan Portugal.The Azores have a subtropical climate with high humidity. An abundant flora of European and Mediterranean origins is found there, and mixed forests still cover many of the islands’",
    imageUrl:
      "https://www.portugal.net/en/wp-content/uploads/sites/107/Sao-Miguel-Azzorre.jpg",
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
    title: "",
    country: "",
    continent: "",
    description: "",
    imageUrl: "",
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
    title: "Macghu Picchu",
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
