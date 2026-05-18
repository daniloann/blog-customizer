import { useState, CSSProperties } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';
import styles from './app.module.scss';

export const App = () => {
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const cssVariables = {
		'--font-family': articleSettings.fontFamilyOption.value,
		'--font-size': articleSettings.fontSizeOption.value,
		'--font-color': articleSettings.fontColor.value,
		'--container-width': articleSettings.contentWidth.value,
		'--bg-color': articleSettings.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={cssVariables}>
			<ArticleParamsForm onApply={setArticleSettings} />
			<Article />
		</main>
	);
};
