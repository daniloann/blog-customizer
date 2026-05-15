import os

# Папки, которые нужно сканировать
TARGET_FOLDERS = ['src', 'public', 'webpack']

# Расширения файлов для сбора
EXTENSIONS = ('.tsx', '.ts', '.scss', '.js', '.jsx', '.css', '.html', '.json', '.md')

with open('all_code.txt', 'w', encoding='utf-8') as out:
    for folder in TARGET_FOLDERS:
        if not os.path.exists(folder):
            print(f"⚠️ Папка {folder} не найдена, пропускаем")
            continue
            
        print(f"\n📁 Сканируем папку: {folder}")
        
        for root, dirs, files in os.walk(folder):
            # Пропускаем node_modules внутри папок
            if 'node_modules' in root.split(os.sep):
                continue
                
            for file in files:
                if file.endswith(EXTENSIONS):
                    if file == 'all_code.txt':
                        continue
                        
                    path = os.path.join(root, file)
                    try:
                        out.write(f'\n\n// ========== {path} ==========\n\n')
                        with open(path, 'r', encoding='utf-8') as f:
                            out.write(f.read())
                        print(f'  ✅ Добавлен: {path}')
                    except Exception as e:
                        print(f'  ❌ Ошибка: {path} - {e}')

print('\n🎉 Готово! Файл all_code.txt создан')
print(f'📂 Собраны файлы из папок: {", ".join(TARGET_FOLDERS)}')