export const slicedText = (text: string, maxLength: number) => {
    let sliced = text?.slice(0, maxLength)
    if (sliced?.length < text?.length) {
        return (sliced += "..")
    }
    return sliced
}