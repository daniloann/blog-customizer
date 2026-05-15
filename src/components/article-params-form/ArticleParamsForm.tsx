// src/components/article-params-form/ArticleParamsForm.tsx
import { useState, useRef, useEffect, FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	onApply?: (settings: ArticleStateType) => void; // Сделаем опциональным для проверки
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (onApply) {
			onApply(settings);
		}
		setIsOpen(false);
	};

	const handleReset = () => {
		const resetSettings = { ...defaultArticleState };
		setSettings(resetSettings);
		if (onApply) {
			onApply(resetSettings);
		}
	};

	const toggleSidebar = () => {
		console.log('Toggle sidebar clicked, isOpen:', isOpen);
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={sidebarRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Настройки
					</Text>

					<Separator />

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={settings.fontFamilyOption}
						onChange={(option) =>
							setSettings({ ...settings, fontFamilyOption: option })
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={(option) =>
							setSettings({ ...settings, fontSizeOption: option })
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={settings.fontColor}
						onChange={(option) =>
							setSettings({ ...settings, fontColor: option })
						}
					/>

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={settings.backgroundColor}
						onChange={(option) =>
							setSettings({ ...settings, backgroundColor: option })
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={settings.contentWidth}
						onChange={(option) =>
							setSettings({ ...settings, contentWidth: option })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
