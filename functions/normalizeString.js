export default function normalizeString(str) {
  return str
    .normalize("NFD") // Decompose diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[\s,;“”'"’/()-]/g, "") // Remove spaces and punctuation
    .toLowerCase()
    .replace(/kh/gi, "k")
    .replace(/gh/gi, "g")
    .replace(/ch/gi, "c")
    .replace(/jh/gi, "j")
    .replace(/th/gi, "t")
    .replace(/dh/gi, "d")
    .replace(/ph/gi, "p")
    .replace(/bh/gi, "b")
    .replace(/kk/gi, "k")
    .replace(/gg/gi, "g")
    .replace(/cc/gi, "c")
    .replace(/jj/gi, "j")
    .replace(/tt/gi, "t")
    .replace(/dd/gi, "d")
    .replace(/pp/gi, "p")
    .replace(/bb/gi, "b")
    .replace(/mm/gi, "m")
    .replace(/yy/gi, "y")
    .replace(/rr/gi, "r")
    .replace(/ll/gi, "l")
    .replace(/vv/gi, "v")
    .replace(/ss/gi, "s");
}
