import { describe, expect, it } from 'vitest'
import {
  MASK_PRESETS,
  applyMask,
  extractMaskRaw,
  formatMoney,
  formatMoneyFromDigits,
  isMaskToken,
  matchesMaskToken,
  moneyDigits,
  parseMoneyInput,
  resolveMask,
  unmaskValue,
} from '../src/internal/mask.js'

describe('internal mask', () => {
  it('resolves presets and custom masks', () => {
    expect(resolveMask('', 'cpf')).toBe(MASK_PRESETS.cpf)
    expect(resolveMask('##-##', 'cpf')).toBe('##-##')
    expect(resolveMask('', 'missing')).toBe('')
    expect(resolveMask(null, null)).toBe('')
  })

  it('applies digit masks for CPF and phone', () => {
    expect(applyMask('52998224725', MASK_PRESETS.cpf)).toBe('529.982.247-25')
    expect(applyMask('11987654321', MASK_PRESETS.phone)).toBe('(11) 98765-4321')
    expect(applyMask('hello', '')).toBe('hello')
    expect(applyMask(null, null)).toBe('')
    expect(applyMask('12345', '##')).toBe('12')
    expect(unmaskValue('529.982.247-25', MASK_PRESETS.cpf)).toBe('52998224725')
    expect(unmaskValue('plain', '')).toBe('plain')
    expect(unmaskValue(null, '')).toBe('')
    expect(extractMaskRaw('ab12', '---')).toBe('ab12')
    expect(extractMaskRaw('a1b2', '')).toBe('a1b2')
    expect(extractMaskRaw(null, '###')).toBe('')
  })

  it('supports letter and alphanumeric tokens', () => {
    expect(applyMask('ABC1D23', 'AAA-#A##')).toBe('ABC-1D23')
    expect(applyMask('ab12cd34', '****-****')).toBe('ab12-cd34')
    expect(isMaskToken('#')).toBe(true)
    expect(isMaskToken('A')).toBe(true)
    expect(isMaskToken('*')).toBe(true)
    expect(isMaskToken('-')).toBe(false)
    expect(matchesMaskToken('', '#')).toBe(false)
    expect(matchesMaskToken('1', '#')).toBe(true)
    expect(matchesMaskToken('a', 'A')).toBe(true)
    expect(matchesMaskToken('1', 'A')).toBe(false)
    expect(matchesMaskToken('a', '*')).toBe(true)
    expect(matchesMaskToken('-', '*')).toBe(false)
    expect(matchesMaskToken('x', 'Z')).toBe(false)
  })

  it('ignores characters that do not match the next token', () => {
    expect(applyMask('12ab345', '###.###')).toBe('123.45')
  })

  it('parses and formats money amounts', () => {
    expect(parseMoneyInput('1234', 2)).toBe(12.34)
    expect(parseMoneyInput('R$ 1.234,56', 2)).toBe(1234.56)
    expect(parseMoneyInput('-15', 2, true)).toBe(-0.15)
    expect(parseMoneyInput('-15', 2, false)).toBe(0.15)
    expect(parseMoneyInput('', 2)).toBe(0)
    expect(parseMoneyInput('12', -2)).toBe(12)
    expect(parseMoneyInput('12', 0)).toBe(12)
    expect(moneyDigits(null)).toBe('')
    expect(moneyDigits(undefined)).toBe('')
    expect(formatMoney(12.34, { locale: 'pt-BR', currency: 'BRL' })).toContain('12,34')
    expect(formatMoney(12.34, { locale: 'en-US', currency: 'USD', currencyDisplay: 'code' })).toContain('USD')
    expect(formatMoney(12.34)).toContain('12,34')
    expect(formatMoney(Number.NaN, { locale: 'pt-BR', currency: 'BRL' })).toContain('0')
    expect(formatMoney(12.3456, { locale: 'pt-BR', currency: 'BRL', precision: Number.NaN })).toContain('12')
    expect(formatMoney(12.34, { locale: 'pt-BR', currency: 'BRL', precision: 0 })).toContain('12')
    expect(formatMoney(12.34, { locale: 'pt-BR', currency: 'NOTREAL' })).toBe('12.34')
    expect(formatMoneyFromDigits('1234', { precision: 2, locale: 'pt-BR', currency: 'BRL' })).toContain('12,34')
    expect(formatMoneyFromDigits(null, {})).toContain('0')
    expect(formatMoneyFromDigits('-15', { precision: 2, allowNegative: true, locale: 'pt-BR', currency: 'BRL' })).toContain('0,15')
    expect(moneyDigits('R$ 1.234')).toBe('1234')
    expect(parseMoneyInput('9'.repeat(400), 2)).toBe(0)
  })
})
