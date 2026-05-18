import os
from pathlib import Path

def collect_code_to_file():
    """
    Упрощённая и надёжная версия для сбора кода из папок src, public, webpack
    """
    
    # Текущая директория (где находится скрипт)
    current_dir = Path.cwd()
    
    # Целевые папки
    target_dirs = ["src", "public", "webpack"]
    
    # Расширения файлов для сбора
    extensions = ['.py', '.js', '.jsx', '.ts', '.tsx', '.html', '.css', 
                  '.scss', '.json', '.vue', '.txt', '.md']
    
    # Папки для игнорирования
    ignore_dirs = ['node_modules', '.git', '__pycache__', 'dist', 'build']
    
    output_file = current_dir / "collected_code.txt"
    
    print(f"Текущая директория: {current_dir}")
    print(f"Будет создан файл: {output_file}")
    print(f"Ищем папки: {target_dirs}\n")
    
    # Проверяем существование папок
    found_folders = []
    for folder in target_dirs:
        folder_path = current_dir / folder
        if folder_path.exists():
            found_folders.append(folder)
            print(f"✓ Найдена папка: {folder}")
        else:
            print(f"✗ Папка не найдена: {folder} (путь: {folder_path})")
    
    if not found_folders:
        print("\nНИ ОДНА ИЗ ПАПОК НЕ НАЙДЕНА!")
        print("\nТекущее содержимое директории:")
        for item in current_dir.iterdir():
            if item.is_dir():
                print(f"  📁 {item.name}")
            else:
                print(f"  📄 {item.name}")
        return False
    
    total_files = 0
    total_chars = 0
    
    try:
        # Открываем файл для записи
        with open(output_file, 'w', encoding='utf-8') as out:
            out.write("=" * 80 + "\n")
            out.write("СОДЕРЖИМОЕ ПРОЕКТА\n")
            out.write("=" * 80 + "\n\n")
            
            # Проходим по каждой найденной папке
            for folder_name in found_folders:
                folder_path = current_dir / folder_name
                out.write(f"\n{'=' * 80}\n")
                out.write(f"ПАПКА: {folder_name}/\n")
                out.write(f"{'=' * 80}\n\n")
                
                # Рекурсивно обходим все файлы
                for root, dirs, files in os.walk(folder_path):
                    # Удаляем игнорируемые папки из обхода
                    dirs[:] = [d for d in dirs if d not in ignore_dirs]
                    
                    for file in files:
                        file_path = Path(root) / file
                        ext = file_path.suffix.lower()
                        
                        # Проверяем расширение
                        if ext not in extensions:
                            continue
                        
                        try:
                            # Читаем файл
                            with open(file_path, 'r', encoding='utf-8') as f:
                                content = f.read()
                            
                            # Относительный путь
                            rel_path = file_path.relative_to(current_dir)
                            
                            # Записываем в выходной файл
                            out.write(f"\n{'─' * 80}\n")
                            out.write(f"ФАЙЛ: {rel_path}\n")
                            out.write(f"─" * 80 + "\n\n")
                            out.write(content)
                            out.write("\n\n")
                            
                            total_files += 1
                            total_chars += len(content)
                            print(f"  ✓ Добавлен: {rel_path} ({len(content)} символов)")
                            
                        except UnicodeDecodeError:
                            print(f"  ⚠ Пропущен (бинарный): {file}")
                        except Exception as e:
                            print(f"  ✗ Ошибка {file}: {e}")
            
            # Записываем статистику
            out.write("\n" + "=" * 80 + "\n")
            out.write("СТАТИСТИКА\n")
            out.write("=" * 80 + "\n")
            out.write(f"Всего файлов: {total_files}\n")
            out.write(f"Всего символов: {total_chars}\n")
            out.write(f"Размер файла: ~{total_chars // 1024} KB\n")
    
    except Exception as e:
        print(f"\nОШИБКА при создании файла: {e}")
        return False
    
    print(f"\n{'=' * 50}")
    print(f"ГОТОВО!")
    print(f"Собрано файлов: {total_files}")
    print(f"Результат сохранён: {output_file}")
    print(f"{'=' * 50}")
    
    return True

# Запускаем скрипт
if __name__ == "__main__":
    success = collect_code_to_file()
    
    if not success:
        print("\nСОВЕТЫ:")
        print("1. Убедитесь, что скрипт находится в корневой папке проекта")
        print("2. Проверьте названия папок (должны быть 'src', 'public', 'webpack')")
        print("3. Запустите скрипт командой: python script_name.py")