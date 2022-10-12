<ScrollView
  style={{ backgroundColor: Colors.gray200 }}
  showsVerticalScrollIndicator={false}
>
  <View style={{ marginTop: 5 }}>
    {Persons.map((persons) => {
      return (
        <View
          style={{
            marginTop: 2,
          }}
        >
          <PersonCard
            name={persons.name}
            image={persons.img}
            address={persons.address}
            rating={persons.rating}
            ratingcount={persons.ratingcount}
          />
        </View>
      );
    })}
  </View>
</ScrollView>;
