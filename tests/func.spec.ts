import {
  getRandomBytes,
  getUniqId,
  sha256,
  isObjectId,
} from '../src/utils/func';

describe('func', () => {
  describe('getRandomBytes', () => {
    it('should return a string with length 10 characters (5 bytes in hex)', () => {
      const result = getRandomBytes();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(10);
    });
  });

  describe('getUniqId', () => {
    it('should return a string of length 64 characters (SHA256 hash length)', () => {
      const result = getUniqId();
      expect(typeof result).toBe('string');
      expect(result.length).toBe(64);
    });

    it('should not return a string with empty characters', () => {
      const result = getUniqId();
      expect(result).not.toMatch(/^[\s\uFEFF\xA0]+$/);
    });
  });

  describe('sha256', () => {
    it('should return a string of length 64 characters (SHA256 hash length)', () => {
      const result = sha256('test');
      expect(typeof result).toBe('string');
      expect(result.length).toBe(64);
    });

    it('should not return a string with empty characters', () => {
      const result = sha256('test');
      expect(result).not.toMatch(/^[\s\uFEFF\xA0]+$/);
    });

    it('should return the same hash for the same input', () => {
      const str = 'test';
      const result1 = sha256(str);
      const result2 = sha256(str);
      expect(result1).toBe(result2);
    });

    it('should return different hashes for different input', () => {
      const str1 = 'test1';
      const str2 = 'test2';
      const result1 = sha256(str1);
      const result2 = sha256(str2);
      expect(result1).not.toBe(result2);
    });
  });

  describe('isObjectId', () => {
    it('should return true for a valid ObjectId string', () => {
      const validId = '5c6a7f9a792c4918b8ce8844';
      const result = isObjectId(validId);
      expect(result).toBe(true);
    });

    it('should return false for an invalid ObjectId string', () => {
      const invalidId1 = '5c6a7f9a792c4918b8ce884';
      const invalidId2 = '5c6a7f9a792c4918b8ce88444f';
      const invalidId3 = 'notanobjectid';
      const result1 = isObjectId(invalidId1);
      const result2 = isObjectId(invalidId2);
      const result3 = isObjectId(invalidId3);
      expect(result1).toBe(false);
      expect(result2).toBe(false);
      expect(result3).toBe(false);
    });
  });
});
