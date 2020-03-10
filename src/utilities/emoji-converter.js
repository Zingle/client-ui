import EmojiConvertor from 'emoji-js';

const instance = new EmojiConvertor;

instance.init_env();
instance.replace_mode = 'unified';
instance.allow_native = false;
instance.img_sets.apple.path = 'https://cdn.zingle.me/web-assets/emoji/64/';
// Save in case need for stylesheet arises. Currently this is not the case.
// converter.img_sets.apple.sheet = 'https://cdn.zingle.me/web-assets/emoji/64/sheets-256/64.png';
instance.replaceColons = instance.replace_colons;
instance.replaceUnified = instance.replace_unified;

export default instance;