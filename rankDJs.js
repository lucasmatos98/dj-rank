async function main() {
  const mainFloor = [
    'JUMPSTREET',
    'JUSTIN CHAOS',
    'KILLATK',
    'KOBOT',
    'LABIRINTO',
    'LOGICA',
    'LOOPUS IN FABULA',
    'LUIS M',
    'LUNA RAVE',
    'MAIKO',
    'MAJOR 7',
    'MAURICIO K',
    'MARAMBA',
    'MOKSHA',
    'MENTAL BROADCAST',
    'NEELIX',
    'NEVERMIND',
    'NOCKS',
    'OUT OF ORBIT',
    'OZCEAN',
    'PAULA',
    'PAULO LOPES',
    'PHAXE',
    'POLARIS',
    'PRAGMATIX',
    'PSIQUE',
    'PURIST',
    'QUEROX',
    'RADIKAL MOODZ',
    'REVERSE LOGIC',
    'RICHES',
    'RIKTAM',
    'RINKADINK',
    'RISING DUST',
    'RUBACK',
    'SHERDER',
    'SHOVE',
    'SHIVATREE',
    'SONIC SPECIES',
    'SPECIAL M',
    'SPECTRASONICS',
    'SPOOTNIK,',
    'STEPH',
    'SWARUP',
    'SYNTHATIC',
    'SYNTHETIC CHAOS',
    'TECHNICAL HITCH',
    'TECHNOLOGY',
    'THE FIRST STONE',
    'THE VERGE',
    'TIJAH',
    'TWELVE SESSIONS',
    'UKA UKA',
    'VEGAS',
    'VIA AXIS',
    'WAIO',
    'WEBRA',
    'WRECKED MACHINES',
    'YABBA',
    'DABBA',
    'Z CAT',
    'AKASHA ALIENATIC',
    'ANESTETIC',
    'ALTRUISM',
    'AMPLIFY',
    'ANGRY LUNA',
    'ATROPP',
    'ASTRIX',
    'ARJUNA',
    'ATHZIRA',
    'AUDIO X',
    'AURA VORTEX',
    'AVALON',
    'AVAN 7',
    'ALADIN',
    'ALL BEATS',
    'BECKER',
    'BLAZY',
    'BLISS',
    'BOOM SHANKAR',
    'BURN IN NOISE',
    'CHAPELEIRO',
    'CHOZEN JO',
    'CONFO',
    'CRONOCOPS',
    'DAKSINAMURTI',
    'DEKEL',
    'DELIRIUM TREMENS',
    'DESHI',
    'DEUTSCH',
    'DICK TREVOR',
    'DIKSHA',
    'DIMITRI NAKOV',
    'EARTHSPACE',
    'EKANTA',
    'ELOWINZ',
    'EMIRI',
    'EMOK',
    'ENDEAVOUR',
    'ETNICA',
    'FABIO FUSCO',
    'FALABELLA',
    'FREEDOM FIGHTERS',
    'GIUSEPPE',
    'GOTALIEN',
    'GROUNDBASS',
    'HEADWORKS',
    'HYDE',
    'HYPATIA',
    'INGRAINED INSTINCTS'
  ];


  const mainFloorRanked = await rankDJsByPopularity(mainFloor);
  // const UPClubRanked = await rankDJsByPopularity(UPClub);

  mainFloorRanked.forEach((dj) => {
    console.log(`${dj.name}: ${dj.popularity} listeners`);
  });
}


async function rankDJsByPopularity(DJs) {
  // Use an external API or database to retrieve popularity data for each DJ
  const popularityData = await getPopularityDataForDJs(DJs);

  // Sort the DJs based on their popularity data
  const rankedDJs = DJs.sort((a, b) => {
    return popularityData[b] - popularityData[a];
  });

  return rankedDJs.map(DJ => {
    return { name: DJ, popularity: popularityData[DJ] };
  });
}


async function getPopularityDataForDJs(DJs) {
  // Set up the API endpoint and your API key
  const endpoint = 'http://ws.audioscrobbler.com/2.0/';
  const API_KEY = '42de649a67e8f49bf0d6bd92f22d364e';

  // Create an empty object to store the popularity data for each DJ
  const popularityData = {};

  // Loop through the list of DJs
  for (const DJ of DJs) {
    console.log(`Fetching popularity data for ${DJ}...`);
    // Send a request to the Last.fm API to retrieve the DJ's data
    const response = await fetch(
      `${endpoint}?method=artist.getInfo&artist=${DJ}&api_key=${API_KEY}&format=json`
    );
    const data = await response.json();
    if (data.error) {
      console.log(`Error: ${data.message}. Skipping ${DJ}...`);
      popularityData[DJ] = 0;
      continue;
    }


    // Extract the popularity data from the API response and add it to the object
    popularityData[DJ] = data.artist.stats.listeners;
  }

  return popularityData;
}

main();

