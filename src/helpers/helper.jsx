import { RegExpMatcher, TextCensor, englishDataset, englishRecommendedTransformers } from 'obscenity'

const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
})

export const filterBadWords = (text) => {
    if (matcher.hasMatch(text)) return matcher.censor(text)

    return text
}

export const containsBadWords = (text) => {
    return Boolean(matcher.hasMatch(text))
}