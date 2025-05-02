import { cn } from '../cn';

describe('cn utility function', () => {
  test('handles string input', () => {
    expect(cn('class1 class2')).toBe('class1 class2');
  });

  test('handles array input', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  test('handles object input', () => {
    expect(cn({ 'class1': true, 'class2': false })).toBe('class1');
  });

  test('handles mixed input types', () => {
    expect(cn('class1', ['class2', 'class3'], { 'class4': true }))
      .toBe('class1 class2 class3 class4');
  });

  test('removes duplicates', () => {
    expect(cn('class1', 'class1', 'class2')).toBe('class1 class2');
  });

  test('handles falsy values', () => {
    expect(cn('class1', null, undefined, false, 'class2')).toBe('class1 class2');
  });

  test('handles empty strings and whitespace', () => {
    expect(cn('  class1  ', '', '  class2  ')).toBe('class1 class2');
  });

  test('handles Tailwind utility conflicts', () => {
    // Test basic utility conflict
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    
    // Test multiple utility types
    expect(cn('bg-red-500 text-sm', 'bg-blue-500 text-lg'))
      .toBe('bg-blue-500 text-lg');
    
    // Test with non-utility classes
    expect(cn('custom-class bg-red-500', 'bg-blue-500'))
      .toBe('custom-class bg-blue-500');
    
    // Test with multiple conflicts and non-conflicts
    expect(cn(
      'bg-red-500 text-sm custom-1', 
      'bg-blue-500 text-lg custom-2'
    )).toBe('custom-1 custom-2 bg-blue-500 text-lg');
  });

  test('handles complex nested arrays and objects', () => {
    expect(cn(
      'class1',
      ['class2', ['class3', { 'class4': true }]],
      { 'class5': true, 'class6': false }
    )).toBe('class1 class2 class3 class4 class5');
  });

  test('handles real-world Tailwind examples', () => {
    expect(cn(
      'flex items-center',
      'p-4 sm:p-6 lg:p-8',
      { 'bg-gray-100': true, 'dark:bg-gray-900': true }
    )).toBe('flex items-center p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900');
  });
});
