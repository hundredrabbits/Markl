function add_class (el, c) {
  if (has_class(el, c)) { return }
  el.className = `${el.className} ${c}`
}

function remove_class (el, c) {
  if (!has_class(el, c)) { return }
  el.className = `${el.className}`.replace(c, '').trim()
}

function has_class (el, c) {
  if (el.className.indexOf(c) < 0) { return false }
  return true
}