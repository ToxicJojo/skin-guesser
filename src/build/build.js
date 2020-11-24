const axios = require('axios')
const fs = require('fs-extra')

const groupSkinsNames = [
  // Group Skins
  'Academy',
  'Pentakill',
  'Pool Party',
  'Guardian of the Sands',
  'Prehistoric',
  'Beast Hunter',
  'Warden',
  'Tango',
  'Pajama Guardian',
  // Silver Age
  'Super Kennen',
  'Renektoy',
  'Moo Cow Alistar',
  'Pug\'Maw',
  // Heartseeker
  'Heartseeker Yuumi',
  'Heartseeker Jinx',
  // Astronaut
  'Astronaut Gnar',
  'Astronaut Poppy',
  // Woad Tribe
  'Battleborn Kayle',
  'Exiled Morgana',
  // Battle Boss
  'Arcade Riven',
  'Battle Boss Blitzcrank',
  // Blackfrost
  'Blackfrost Renekton',
  'Blackfrost Alistar',
  // Omen of the Dark
  'Black Scrounge Singed',
  'Cursed Revenant Nocturne',
  'Iron Inquisitor Kayle',
  // Cats VS Dogs
  'Fuzz Fizz',
  'Corgi Corki',
  'Pretty Kitty Rengar',
  'Meowrick',
  // Culinary Masters
  'Baker Pantheon',
  'Barbecue Leona',
  'Butcher Olaf',
  'Sashimi Akali',
  // These skins share a splash even though they are not all from the same skinline
  'Draven Draven',
  'Definitely Not Vel\'Koz',
  'Meowkai',
  'Urf Kench',
  // Rift Quest
  'Ryze Whitebeard',
  'Braum Lionhear',
  'Gragas Caskbreaker',
  'Varus Swiftbold',
  'Taric Luminshield',
  'Twitch Shadowfoot',
  'Talon Blackwood',
  // Socer Cup
  'Goalkeeper Maokai',
  'Red Card Twisted Fate',
  'Striker Lucian',
  'Superfan Gragas',
  'Sweeper Alistar',
  // Sugar Rush
  'Sugar Rush Braum',
  'Sugar Rush Evelynn',
  // Highstakes
  'Ace of Spades Ezeral',
  'Jack of Hearts Twisted Fate',
  'King of Clubs Mordekaiser',
  'Queen of Diamonds Syndra',
  'Wild Card Shaco',
  // Lunar Wraith
  'Lunar Wraith Morgana',
  'Lunar Wraith Caitlyn',
  // Luchador
  'El Macho Mundo',
  'El Rayo Volibear',
  'El León Gnar',
  // Infernal
  'Infernal Galio',
  'Infernal Varus',
  'Infernal Shen',
  'Infernal Kennen',
  'Infernal Karthus',
  // Zombies VS Slayers
  'Zombie Slayer Jinx',
  'Zombie Slayer Pantheon',
  'Zombie Nunu & Willump',
  // Worldbreaker
  'Worldbreaker Hecarim',
  'Worldbreaker Nasus',
  'Worldbreaker Nautilus',
  'Worldbreaker Trundle',
  // Bilgewater: Burning Tides
  'Ironside Malphite',
  'Sea Hunter Aatrox',
  'Corsair Quinn',
  'Rouge Admiral Garen',
  'Cutthroat Graves',
  'Cutpurse Twisted Fate',
  // Cops and Robber
  'Captain Volibear',
  'Constable Trundle',
  'Safecracker Evelynn',
  'Pickpocket Twitch',
  // There are other snow day skins which don't have group arts
  'Snow Day Bard',
  'Snow Day Gnar',
  'Snow Day Syndra',
  // There are other snow cosmic skins which don't have group arts
  'Cosmic Dusk Xayah',
  'Cosmic Dawn Rakan',
  // These jokes skins have a group art
  'Order of the Banana Soraka',
  'Urf the Nami-tee',
  'Definitely Not Udyr',
  'Archduke Nasus',
  'Suprise Party Amumu',
  // Xayah and Rakan skins share the same art
  'Sweetheart Xayah',
  'Sweetheart Rakan',
  // World Champion skinlines
  'Fnatic',
  'TPA',
  'SKT T1',
  'SSW',
  'SSG',
  'iG',
  'FPX',
]

const DATA_DRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com'
axios.defaults.baseURL = DATA_DRAGON_BASE_URL

const isGroupSkin = (skin) => {
  return groupSkinsNames.some((name) => {
    return skin.name.includes(name)
  })
}

/**
 * Fetches the avaiable game versions from data dragon and returns the most current one.
 * @returns The most current game version.
 */
const getCurrentVersion = async () => {
  // Load the list of game versions from the data dragon api. (see https://developer.riotgames.com/docs/lol#data-dragon_versions)
  const versions = (await axios.get('/api/versions.json')).data
  // The most recent version is the first one in the list.
  return versions[0]
}

const getChampionData = async (version) => {
  // Load the basic champion data for the current game version. Each campion is an object in the 'data' attribute of the response. (see https://developer.riotgames.com/docs/lol#data-dragon_champions)
  const championData = (await axios.get(`/cdn/${version}/data/en_US/champion.json`)).data.data
  // We want the champion data as an array.
  const championArray = Promise.all(Object.entries(championData).map(async ([_, { id, name }]) => {
    const skins = await getSkinData(version, id, name)

    const champion = {
      id,
      name,
      skins,
    }
    return champion
  }))

  return championArray
}

const getSkinData = async (version, championId, championName) => {
  // Load the champion data for a specific champion for the current game version.
  // The data for the champion is inside the 'data.${championId}' attribute of the response. (see https://developer.riotgames.com/docs/lol#data-dragon_champions)
  const championData = (await axios.get(`/cdn/${version}/data/en_US/champion/${championId}.json`)).data.data
  let skinData = championData[championId].skins

  // Add the splash art url to each skin
  skinData = skinData.map((skin) => {
    skin.splashUrl = `${DATA_DRAGON_BASE_URL}/cdn/img/champion/splash/${championId}_${skin.num}.jpg`
    skin.loadingUrl = `${DATA_DRAGON_BASE_URL}/cdn/img/champion/loading/${championId}_${skin.num}.jpg`
    if (skin.name === 'default') {
      skin.name = `Base ${championName}`
    }

    if (isGroupSkin(skin)) {
      skin.isGroupSkin = true
    } else {
      skin.isGroupSkin = false
    }

    return skin
  })

  return skinData
}

((async () => {
  const currentVersion = await getCurrentVersion()

  const championData = await getChampionData(currentVersion)

  fs.writeJSONSync('src/data/champions.json', championData)
}))()
