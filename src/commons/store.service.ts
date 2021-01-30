import { computed, ComputedRef } from "vue";
import { useStore } from "vuex";

export function useGetter<T = unknown>(
  getter: string,
  namespace?: string
): ComputedRef<T> {
  const store = useStore();
  const resultGetter = namespace ? `${namespace}/${getter}` : getter;

  return computed(() => store.getters[resultGetter]);
}

export function useDispatch<T = never>(
  action: string,
  namespace?: string
): (arg?: T) => Promise<boolean> {
  const store = useStore();
  const resultAction = namespace ? `${namespace}/${action}` : action;

  return arg => store.dispatch(resultAction, arg);
}
