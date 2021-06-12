import { DependencyList, useEffect, useState } from 'react'

export const useAsyncMemo = <T>(
    factory: () => Promise<T> | undefined | null,
    deps: DependencyList,
    // @ts-ignore
    initial: T = undefined
): T => {
    const [val, setVal] = useState<T>(initial)
    useEffect(() => {
        let cancel = false
        const promise = factory()
        if (promise === undefined || promise === null) return
        promise.then((val) => {
            if (!cancel) {
                setVal(val)
            }
        })
        return () => {
            cancel = true
        }
    }, deps)
    return val
}
