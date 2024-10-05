function createInitialSudokuData() {
    return Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () =>
          Array.from({ length: 3 }, () =>
            Array.from({ length: 3 }, () => {
              const modifiable = Math.random() < 0.5
              const result = {
                modifiable: modifiable,
                value: modifiable ? 0 : Math.floor(Math.random() * 10)
              }
              return result
            })
          )
        )
      );
}

export { createInitialSudokuData };