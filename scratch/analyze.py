import re
import subprocess

# Run git show in a subprocess and get utf-8 string
res = subprocess.run(['git', 'show', 'origin/master:src/app/(public)/page.tsx'], capture_output=True, text=True, encoding='utf-8')
content = res.stdout

# Let's search for '<section' and find its className, and then the next '<div' and its className
matches = re.finditer(r'<section\b[^>]*>', content)
for m in matches:
    tag = m.group(0)
    # Extract className
    cls_match = re.search(r'className="([^"]*)"', tag)
    cls = cls_match.group(1) if cls_match else 'no-class'
    print(f"Section tag: {tag[:80]}...")
    print(f"  Class: {cls}")
    
    # Find next div inside
    start_pos = m.end()
    next_div = re.search(r'<div\b[^>]*>', content[start_pos:])
    if next_div:
        div_tag = next_div.group(0)
        div_cls_match = re.search(r'className="([^"]*)"', div_tag)
        div_cls = div_cls_match.group(1) if div_cls_match else 'no-class'
        print(f"  First Div: {div_tag[:80]}...")
        print(f"    Class: {div_cls}")
