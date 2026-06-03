import { observer } from 'mobx-react-lite';
import type { CartStore } from '../stores/CartStore';
import { View, Text, StyleSheet } from 'react-native';


interface CartProps {
    cartStore: CartStore;
}

const CartSummary = observer(({ cartStore }: CartProps) => {
    const totalItems = cartStore.TotalItems;
    const totalPrice = cartStore.TotalPrice;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Total Items: {totalItems}</Text>
            <Text style={styles.text}>Total Price: ${totalPrice}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
    },
});

export default CartSummary;
