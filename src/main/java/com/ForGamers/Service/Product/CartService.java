package com.ForGamers.Service.Product;

import com.ForGamers.Model.Product.Cart;
import com.ForGamers.Model.Product.CartEntry;
import com.ForGamers.Model.Product.CartProductPair;
import com.ForGamers.Model.Product.Product;
import com.ForGamers.Model.User.Client;
import com.ForGamers.Service.User.ClientService;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.tuple.MutablePair;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Getter
@Schema(description = "Servicio de carritos.")
@Service
public class CartService {
    private final CartEntryService cartEntryService;
    private final ClientService clientService;
    private final ProductService productService;

    public List<CartEntry> convertCart(Cart cart) {
        List<CartEntry> list = new ArrayList<>();
        Optional<Client> clientOp = clientService.getById(cart.getClientId());

        if (clientOp.isEmpty()) return list;
        for (CartProductPair pair : cart.getContents()) {
            Optional<Product> productOp = productService.getById(pair.productId);
            productOp.ifPresent(product -> list.add(new CartEntry(
                    product,
                    clientOp.get(),
                    pair.quantity
            )));
        }
        return list;
    }
    public Cart convertCart(List<CartEntry> cartEntryList) {
        List<CartProductPair> list = new ArrayList<>();

        for (CartEntry entry : cartEntryList) {
            list.add(new CartProductPair(entry.getCantInCart(), entry.getProduct().getId()));
        }
        return new Cart(
                cartEntryList.get(0).getClient().getId(),
                list
        );
    }

    public Cart getByClient(Long clientId) {
        return convertCart(
                cartEntryService.getCartEntriesByClient(clientId)
        );
    }

    public List<Cart> list() {
        return cartEntryService.list().stream()
                .collect(Collectors.groupingBy(entry -> entry.getClient().getId()))
                .values().stream()
                .map(this::convertCart)
                .collect(Collectors.toList());
    }

    public List<Product> getProductsByClient(Long clientId) {
        return cartEntryService.getProductsByClient(clientId);
    }

    public double getTotalPriceByClient(Long clientId) {
        return cartEntryService.getProductsByClient(clientId).stream()
                .mapToDouble(Product::getPrice)
                .sum();
    }
}
