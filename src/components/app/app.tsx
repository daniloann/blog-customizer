// src/components/app/app.tsx
import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [appSettings, setAppSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApplySettings = (settings: ArticleStateType) => {
		console.log('Applying settings:', settings);
		setAppSettings(settings);
	};

	const cssVariables = {
		'--font-family': appSettings.fontFamilyOption.value,
		'--font-size': appSettings.fontSizeOption.value,
		'--font-color': appSettings.fontColor.value,
		'--container-width': appSettings.contentWidth.value,
		'--bg-color': appSettings.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={cssVariables}>
			<ArticleParamsForm onApply={handleApplySettings} />
			<Article />
		</main>
	);
};
