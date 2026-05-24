'use client';

import { useEffect } from 'react';

// 7 hardcoded service slugs that already exist in the static nav.
// We DON'T duplicate these — only add NEW services from the DB.
const STATIC_NAV_SLUGS = new Set([
  'semantic-seo-architecture',
  'semantic-content-audit',
  'semantic-content-production',
  'pipeline-attribution-seo',
  'llm-ai-search-visibility',
  'authority-link-building',
  'semantic-content-network',
]);

// Map of static slug -> which tier column it lives in.
// Used to find the right <ul> to inject into.
const TIER_SLUG_MAP: Record<string, 'CLAIM' | 'SHIELD' | 'SCALE'> = {
  'semantic-seo-architecture': 'CLAIM',
  'semantic-content-audit': 'CLAIM',
  'semantic-content-production': 'SCALE',
  'pipeline-attribution-seo': 'SCALE',
  'llm-ai-search-visibility': 'SHIELD',
  'authority-link-building': 'SHIELD',
  'semantic-content-network': 'SHIELD',
};

// Marker class so we don't inject twice on re-runs
const INJECTED_CLASS = 'dv-injected-service';

interface DbService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  heroLabel: string;
  tier: 'CLAIM' | 'SHIELD' | 'SCALE';
}

export default function ClientFixes() {
  useEffect(() => {

    const setupFeedback = () => {
      const desktopTrack = document.getElementById('desktopTrack');
      const mobileTrack = document.getElementById('mobileTrack');
      if (!desktopTrack || !mobileTrack || desktopTrack.childElementCount > 0) return;
      const images = [
        '1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','10.png','11.png','stats.png',
        'png 3.png','png 12.png','png 13.png','png 15.png','png 17.png','png 23.png','png 26.png','png 29.png','png 44.png','png 45.png','png 46.png','png 47.png','png 48.png','png 51.png','png 52.png','png 55.png','png 58.png','png 59.png','png 61.png','png 62.png','png 63.png','png 64.png','png 65.png','png 66.png','png 67.png','png 68.png','png 69.png','png 7.png','png 70.png','png 73.png','png 74.png','png 75.png','png 76.png','png 77.png','png 78.png','png 80.png','png 81.png','png 82.png','png 83.png','png 84.png','png 85.png','png 86.png','png 88.png','png36.png','png 87.png'
      ].map((name) => `/images/client-feedback/${name}`);
      const desktopCounter = document.getElementById('desktopCounter');
      const mobileCounter = document.getElementById('mobileCounter');
      const desktopPerPage = 10;
      let desktopPage = 0;
      let mobilePage = 0;
      const desktopTotal = Math.ceil(images.length / desktopPerPage);
      for (let page = 0; page < desktopTotal; page++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'slide-page';
        images.slice(page * desktopPerPage, page * desktopPerPage + desktopPerPage).forEach((src) => {
          const card = document.createElement('div');
          card.className = 'card';
          const img = document.createElement('img');
          img.src = src;
          img.alt = 'Client Feedback';
          card.appendChild(img);
          pageDiv.appendChild(card);
        });
        desktopTrack.appendChild(pageDiv);
      }
      images.forEach((src) => {
        const slide = document.createElement('div');
        slide.className = 'mobile-slide';
        const card = document.createElement('div');
        card.className = 'card';
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Client Feedback';
        card.appendChild(img);
        slide.appendChild(card);
        mobileTrack.appendChild(slide);
      });
      const update = () => {
        (desktopTrack as HTMLElement).style.transform = `translateX(-${desktopPage * 100}%)`;
        (mobileTrack as HTMLElement).style.transform = `translateX(-${mobilePage * 100}%)`;
        if (desktopCounter) desktopCounter.textContent = `${desktopPage + 1} / ${desktopTotal}`;
        if (mobileCounter) mobileCounter.textContent = `${mobilePage + 1} / ${images.length}`;
      };
      document.querySelectorAll('.desktop-controls button').forEach((button, i) => {
        button.addEventListener('click', () => { desktopPage = Math.max(0, Math.min(desktopTotal - 1, desktopPage + (i === 0 ? -1 : 1))); update(); });
      });
      document.querySelectorAll('.mobile-slider .controls button').forEach((button, i) => {
        button.addEventListener('click', () => { mobilePage = Math.max(0, Math.min(images.length - 1, mobilePage + (i === 0 ? -1 : 1))); update(); });
      });
      update();
    };

    const normalizeLinks = () => {
      const set = (id: string, attr: 'href' | 'src', value: string) => {
        const el = document.getElementById(id);
        if (el) el.setAttribute(attr, value);
      };
      set('logoLink', 'href', '/');
      set('logoImg', 'src', '/images/logo.png');
      set('link-om', 'href', '/operating-manual');
      set('link-bp', 'href', '/build-process');
      set('link-vp', 'href', '/vertical-playbooks');
      set('link-audit', 'href', '/the-audit');

      document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
        const raw = a.getAttribute('href') || '';
        if (!raw || raw.startsWith('#') || raw.startsWith('http') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('/')) return;
        let h = raw.replace(/^\.\//, '').replace(/^\.\.\//, '').replace(/\.html($|#)/, '$1');
        if (h === 'index' || h === '') a.setAttribute('href', '/');
        else if (h.startsWith('services/')) a.setAttribute('href', '/' + h);
        else a.setAttribute('href', '/' + h);
      });

      document.querySelectorAll<HTMLImageElement>('img[src]').forEach((img) => {
        const src = img.getAttribute('src') || '';
        if (src.startsWith('images/')) img.setAttribute('src', '/' + src);
        if (src.startsWith('./images/')) img.setAttribute('src', src.replace('./images/', '/images/'));
        if (src.startsWith('../images/')) img.setAttribute('src', src.replace('../images/', '/images/'));
      });

      document.querySelectorAll<HTMLAnchorElement>('.svc-link').forEach((link) => {
        const svc = (link.getAttribute('data-svc') || '').replace(/\.html$/, '').replace(/^services\//, '');
        if (svc) link.href = `/services/${svc}`;
      });
    };

    /**
     * Builds the HTML for one extra service link that matches the existing
     * static link style exactly (same fonts, padding, borders).
     */
    const buildExtraServiceLink = (
      service: DbService,
      isLast: boolean
    ): HTMLLIElement => {
      const li = document.createElement('li');
      li.className = INJECTED_CLASS;

      const a = document.createElement('a');
      a.setAttribute('data-svc', service.slug);
      a.className = 'svc-link';
      a.href = `/services/${service.slug}`;
      a.style.cssText = `text-decoration: none; display: block; padding: 8px 0; border-bottom: ${isLast ? 'none' : '1px solid rgba(0,0,0,0.05)'};`;

      const titleDiv = document.createElement('div');
      titleDiv.style.cssText = "font-family: 'Inter',sans-serif; font-size: 16px; font-weight: 500; color: #111; line-height: 1.3; margin-bottom: 2px;";
      titleDiv.textContent = service.title;

      const subDiv = document.createElement('div');
      subDiv.style.cssText = "font-family: monospace; font-size: 11px; color: #888; line-height: 1.3;";
      subDiv.textContent = service.shortDescription || service.heroLabel || '';

      a.appendChild(titleDiv);
      a.appendChild(subDiv);
      li.appendChild(a);
      return li;
    };

    /**
     * Inject DB-driven services into the existing 3 tier columns of the
     * static nav dropdown. Runs after fetching from /api/public/services.
     *
     * Logic:
     *  - Find each <ul> by locating a known static service slug inside it
     *    (using `data-svc` attribute), then walking up to its <ul> parent.
     *  - Append new services to the matching tier's <ul>.
     *  - Skip if already injected (marker class).
     */
    const injectServicesIntoNav = (services: DbService[]) => {
      // Find anchor static links and use them to identify each <ul>
      const findTierUl = (anchorSlug: string): HTMLUListElement | null => {
        const anchor = document.querySelector<HTMLAnchorElement>(`a.svc-link[data-svc="${anchorSlug}"]`);
        if (!anchor) return null;
        const ul = anchor.closest('ul');
        return ul as HTMLUListElement | null;
      };

      const claimUl = findTierUl('semantic-seo-architecture');
      const scaleUl = findTierUl('semantic-content-production');
      const shieldUl = findTierUl('llm-ai-search-visibility');

      // If nav not present on this page (e.g. PageShell-based pages), bail
      if (!claimUl && !scaleUl && !shieldUl) return;

      // Filter out the 7 hardcoded slugs — only NEW services
      const extra = services.filter((s) => !STATIC_NAV_SLUGS.has(s.slug));

      // Group by tier
      const byTier: Record<'CLAIM' | 'SHIELD' | 'SCALE', DbService[]> = {
        CLAIM: extra.filter((s) => s.tier === 'CLAIM'),
        SHIELD: extra.filter((s) => s.tier === 'SHIELD'),
        SCALE: extra.filter((s) => s.tier === 'SCALE'),
      };

      // Inject helper
      const injectInto = (ul: HTMLUListElement | null, list: DbService[]) => {
        if (!ul) return;

        // Remove previously injected items so we re-render fresh
        ul.querySelectorAll(`li.${INJECTED_CLASS}`).forEach((el) => el.remove());

        // Find the LAST static <li> in this <ul> and remove its bottom border
        // (so the new injected items become the new "last" with no border)
        const staticLis = Array.from(ul.querySelectorAll<HTMLLIElement>('li')).filter(
          (li) => !li.classList.contains(INJECTED_CLASS)
        );
        if (list.length > 0 && staticLis.length > 0) {
          const lastStatic = staticLis[staticLis.length - 1];
          const lastAnchor = lastStatic.querySelector<HTMLAnchorElement>('a.svc-link');
          if (lastAnchor) {
            lastAnchor.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
          }
        }

        // Append the new items
        list.forEach((svc, idx) => {
          const isLast = idx === list.length - 1;
          ul.appendChild(buildExtraServiceLink(svc, isLast));
        });
      };

      injectInto(claimUl, byTier.CLAIM);
      injectInto(scaleUl, byTier.SCALE);
      injectInto(shieldUl, byTier.SHIELD);
    };

    /**
     * Fetch published services from the public API and inject them.
     * Runs once on mount; cached for the page lifetime.
     */
    const loadAndInjectServices = async () => {
      try {
        const res = await fetch('/api/public/services', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data?.services)) {
          injectServicesIntoNav(data.services as DbService[]);
        }
      } catch {
        // Silently fail — static nav still works
      }
    };

    const toggleState = (target: HTMLElement) => {
      const current = target.getAttribute('data-state') || 'issue';
      const map: Record<string, string> = {
        issue: 'recommendation', recommendation: 'issue',
        building: 'outcome', outcome: 'building',
        theory: 'applied', applied: 'theory',
        active: 'complete', complete: 'active',
        diagnostic: 'action', action: 'diagnostic',
        pattern: 'outcome', stack: 'built', built: 'stack',
      };
      target.setAttribute('data-state', map[current] || 'issue');
    };

    const onClickCapture = (event: MouseEvent) => {
      const targetEl = event.target as Element | null;
      if (!targetEl) return;

      const menuBtn = targetEl.closest<HTMLElement>('#menuBtn');
      if (menuBtn) {
        const nav = document.getElementById('navLinks');
        if (nav) {
          event.preventDefault();
          nav.classList.toggle('show');
        }
      }

      const servicesToggle = targetEl.closest<HTMLElement>('#servicesToggle');
      if (servicesToggle && window.innerWidth < 960) {
        const mega = document.getElementById('megaMenu');
        const chev = document.getElementById('serviceChevron') as HTMLElement | null;
        if (mega) {
          event.preventDefault();
          mega.classList.toggle('show');
          if (chev) chev.style.transform = mega.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }

      const toggleBtn = targetEl.closest<HTMLElement>('[data-toggle]');
      if (toggleBtn) {
        const targetId = toggleBtn.getAttribute('data-toggle');
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) {
          event.preventDefault();
          toggleState(target);
          return;
        }
      }

      const faqBtn = targetEl.closest<HTMLElement>('.faq-question');
      if (faqBtn) {
        const item = faqBtn.closest<HTMLElement>('.faq-item');
        const answer = item?.querySelector<HTMLElement>('.faq-answer');
        if (!item || !answer) return;
        event.preventDefault();
        const isOpen = item.classList.contains('open');
        document.querySelectorAll<HTMLElement>('.faq-item.open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            const openAnswer = openItem.querySelector<HTMLElement>('.faq-answer');
            if (openAnswer) openAnswer.style.maxHeight = '0px';
          }
        });
        if (isOpen) {
          item.classList.remove('open');
          answer.style.maxHeight = '0px';
        } else {
          item.classList.add('open');
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      }
    };

    normalizeLinks();
    setupFeedback();
    loadAndInjectServices(); // ← fetch + inject DB services on every page load
    document.addEventListener('click', onClickCapture, true);
    const mo = new MutationObserver(() => { normalizeLinks(); setupFeedback(); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      document.removeEventListener('click', onClickCapture, true);
      mo.disconnect();
    };
  }, []);

  return null;
}
