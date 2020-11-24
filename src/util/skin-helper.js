const filterSkins = (skins, settings) => {
  let skinList = skins
  if (settings.includeBaseSkins) {
    skinList = skins.slice()
  } else {
    skinList = skins.slice(1)
  }

  if (!settings.includeGroupSkins) {
    skinList = skinList.filter((skin) => {
      return !skin.isGroupSkin
    })
  }

  return skinList
}

export default {
  filterSkins,
}
