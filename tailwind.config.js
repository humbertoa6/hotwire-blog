module.exports = {
  mode: 'jit',
  content: [
    "./app/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    './app/assets/stylesheets/**/*.css',
  ],
  plugins: [
    require('@tailwindcss/forms')
  ],
}