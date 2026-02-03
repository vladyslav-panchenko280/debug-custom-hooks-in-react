# Pizza Debug Shop

A small React + TypeScript app with **intentional bugs** in custom hooks for debugging practice.

## Setup

```bash
npm install
npm run dev
```

## Debug Tools

| Tool | Purpose |
|------|---------|
| **React DevTools** | Inspect hooks, components, useDebugValue output |
| **StrictMode** | Double-invokes effects to catch side-effect bugs |
| **useDebugValue** | Custom labels in DevTools for hooks |
| **Console** | Watch for warnings, repeated logs |
| **Profiler** | Detect unnecessary re-renders |

## Bugs to Find

### Bug #1: Race Condition (usePizzaMenu)
- **Location**: `src/hooks/usePizzaMenu.ts`
- **Symptom**: Data fetches twice in StrictMode
- **Tool**: Console, StrictMode
- **Hint**: Missing cleanup in useEffect

### Bug #2: Stale Closure (useCart)
- **Location**: `src/hooks/useCart.ts`
- **Symptom**: Adding same pizza rapidly doesn't increment correctly
- **Tool**: React DevTools, rapid clicking
- **Hint**: Check useCallback dependencies

### Bug #3: Missing Dependency (useLocalStorage)
- **Location**: `src/hooks/useLocalStorage.ts`
- **Symptom**: Changing storage key doesn't save to correct key
- **Tool**: DevTools, localStorage inspection
- **Hint**: useEffect dependency array

### Bug #4: Unstable Reference (usePizzaOrder)
- **Location**: `src/hooks/usePizzaOrder.ts`
- **Symptom**: Console spam "Order hook effect running"
- **Tool**: Console, Profiler
- **Hint**: Array reference in dependency

## Tasks Checklist

### Part 1: Setup & Explore
- [ X ] Install React DevTools browser extension
- [ X ] Run the app with `npm run dev`
- [ X ] Open DevTools → Components tab
- [ X ] Find `useDebugValue` output for each hook

### Part 2: StrictMode Investigation
- [ X ] Watch console on page load
- [ X ] Notice double effect execution
- [ X ] Try removing `<StrictMode>` from main.tsx
- [ X ] Compare behavior with/without StrictMode

### Part 3: Find & Fix Bugs
- [ ] **Bug #1**: Add cleanup to usePizzaMenu
- [ ] **Bug #2**: Fix useCallback in useCart
- [ ] **Bug #3**: Add missing dependency in useLocalStorage
- [ ] **Bug #4**: Stabilize reference in usePizzaOrder

### Part 4: Verify Fixes
- [ ] No double fetches with StrictMode
- [ ] Rapid add-to-cart works correctly
- [ ] localStorage persists with correct key
- [ ] No console spam from order hook

## Learning Goals

1. Understand StrictMode double-invoke behavior
2. Use useDebugValue for hook inspection
3. Identify stale closures in callbacks
4. Handle async cleanup properly
5. Stabilize object/array dependencies
