interval(1000).pipe(
    take(4),
    mergeMap(x => of(x).pipe(delay(x * 100)))
  )
  .subscribe(
    x => console.log(x)
  );
