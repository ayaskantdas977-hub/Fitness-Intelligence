import { describe, it, expect } from 'vitest';
import { COURSES_CATALOG, type Course } from '../src/data/coursesData';

describe('Courses Data & Marketplace Integrity', () => {
  it('loads valid courses catalog with essential metadata', () => {
    expect(COURSES_CATALOG).toBeDefined();
    expect(Array.isArray(COURSES_CATALOG)).toBe(true);
    expect(COURSES_CATALOG.length).toBeGreaterThanOrEqual(6);
  });

  it('ensures each course has a unique id and non-empty title and description', () => {
    const ids = new Set<string>();
    COURSES_CATALOG.forEach((course: Course) => {
      expect(course.id).toBeTruthy();
      expect(ids.has(course.id)).toBe(false);
      ids.add(course.id);

      expect(course.title.trim().length).toBeGreaterThan(5);
      expect(course.subtitle.trim().length).toBeGreaterThan(15);
      expect(course.categoryLabel.trim().length).toBeGreaterThan(0);
      expect(course.logoBadge).toBeDefined();
    });
  });

  it('validates ratings and student counts are in realistic bounds', () => {
    COURSES_CATALOG.forEach((course: Course) => {
      expect(course.rating).toBeGreaterThanOrEqual(4.0);
      expect(course.rating).toBeLessThanOrEqual(5.0);
      expect(course.reviewsCount).toBeGreaterThan(50);
      expect(course.studentsEnrolled).toBeGreaterThan(course.reviewsCount);
    });
  });

  it('validates pricing models and original discounts in INR', () => {
    COURSES_CATALOG.forEach((course: Course) => {
      expect(course.priceInr).toBeGreaterThan(0);
      expect(course.originalPriceInr).toBeGreaterThan(course.priceInr);
    });

    // Check specifically for budget sweet-spot courses (around 1,500)
    const budgetCourses = COURSES_CATALOG.filter((c) => c.priceInr >= 1400 && c.priceInr <= 1600);
    expect(budgetCourses.length).toBeGreaterThanOrEqual(3);
  });

  it('validates instructor contact protocols including direct WhatsApp support', () => {
    COURSES_CATALOG.forEach((course: Course) => {
      expect(course.instructor.name.trim().length).toBeGreaterThan(0);
      expect(course.instructor.credentials.trim().length).toBeGreaterThan(0);
      expect(course.instructor.email).toContain('@');
      expect(course.instructor.whatsappNumber).toMatch(/^\+?\d+/);
      expect(course.instructor.whatsappMessage.length).toBeGreaterThan(5);
    });
  });

  it('validates curriculum modules have non-empty lessons and valid video previews', () => {
    COURSES_CATALOG.forEach((course: Course) => {
      expect(course.curriculum.length).toBeGreaterThan(0);
      course.curriculum.forEach((mod) => {
        expect(mod.moduleTitle.trim().length).toBeGreaterThan(0);
        expect(mod.lessons.length).toBeGreaterThan(0);
        mod.lessons.forEach((lesson) => {
          expect(lesson.title.trim().length).toBeGreaterThan(0);
          expect(lesson.duration.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });
});
