import { openai, supabase } from './config-non-vite.js'
import data from './content.js'

async function main(data) {
  const embeddingsRaw = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: data.map(movie => movie.content),
    encoding_format: "float",
  })

  const embeddings = data.map((movie, i) => {
    return {
      title: movie.title,
      release_year: movie.releaseYear,
      content: movie.content,
      embedding: embeddingsRaw.data[i].embedding
  }})

  await supabase.from('movies').insert(embeddings)
  console.log('Embedding and storing in the database complete!')
}

await main(data)