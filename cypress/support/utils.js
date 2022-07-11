import { build, fake, sequence } from 'test-data-bot'

export const userBuilder = build('user').fields({
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password())
})

export const dataBuilder = build('data').fields({
    id: sequence((s) => s),
})

export const postBuilder = build('post').fields({
    title: fake((f) => f.lorem.words()),
    content: fake((f) => f.lorem.paragraphs().replace(/\r/g, '')),
    tags: fake((f) => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})