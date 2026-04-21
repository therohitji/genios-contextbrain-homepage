import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/DemoNavy.jsx', encoding='utf-8') as f:
    content = f.read()

# Only replace within the Applications component
start = content.find('const Applications = () => {')
end_marker = '\n};\n\n/* ──────────────────────────────────────────────────────────────\n   · TIER USE CASES'
end = content.find(end_marker, start)

section = content[start:end]

# Replace only background: T.ink usages (not color: T.ink, border: T.ink etc.)
replacements = [
    # Control panel dark top strip
    ('background: T.ink, padding: "clamp(18px,2.',
     'background: T.navy, padding: "clamp(18px,2.'),
    # Left rail
    ('background: T.ink, color: T.paper, padding:',
     'background: T.navy, color: T.paper, padding:'),
    # "With GeniOS" card
    ('background: T.ink, borderBottom: `0.5px solid ${T.brass}`',
     'background: T.navy, borderBottom: `0.5px solid ${T.brass}`'),
    # Plan CTA strip
    ('background: T.ink, position: "relative", overflow: "hidden", flexWrap: "wrap"',
     'background: T.navy, position: "relative", overflow: "hidden", flexWrap: "wrap"'),
    # Outer calculator box border — also use T.navy for consistency
    ('border: `0.5px solid ${T.ink}`, boxShadow:',
     'border: `0.5px solid ${T.navy}`, boxShadow:'),
]

new_section = section
for old, new in replacements:
    count = new_section.count(old)
    if count == 0:
        print(f'WARNING: not found — {repr(old[:60])}')
    else:
        new_section = new_section.replace(old, new, 1)
        print(f'Replaced ({count}x): {repr(old[:60])}')

new_content = content[:start] + new_section + content[end:]

assert new_content != content, "Nothing changed"

with open('src/DemoNavy.jsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('\nDone — T.navy applied to all dark backgrounds in Applications.')
