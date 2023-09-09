import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spin, Input, Select, Form } from "antd";
import "./tradebox.scss";

export function TradeBox() {
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [orderSide, setOrderSide] = useState("buy");
  const [sourceMarketIndex, setSourceMarketIndex] = useState(0);
  const [destinationMarketIndex, setDestinationMarketIndex] = useState(1);
  const [activeButton, setActiveButton] = useState("buy");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.temx.org/api/Market")
      .then((response) => {
        if (response.data && response.data.data) {
          const customData = response.data.data.map((crypto) => ({
            label: crypto.symbol + " - " + crypto.name,
            symbol: crypto.symbol,
            name: crypto.name,
          }));
          customData.sort((a, b) => a.order - b.order);
          setCryptoData(customData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleOnClick = (newOrderSide) => {
    setOrderSide(newOrderSide);
    setActiveButton(newOrderSide);
  };

  const handleSourceMarketSelect = (index) => {
    setSourceMarketIndex(index);
  };

  const handleDestinationMarketSelect = (index) => {
    setDestinationMarketIndex(index);
  };

  const renderActionButton = () => {
    if (cryptoData.length === 0) {
      // Wait until cryptoData is available
      return null;
    }
    const sourceCrypto = cryptoData[sourceMarketIndex];
    const destinationCrypto = cryptoData[destinationMarketIndex];

    switch (activeButton) {
      case "buy":
        return (
          <Button className="buy" id="confirm" onClick={handleBuy}>
            خرید {destinationCrypto.name}{" "}
          </Button>
        );
      case "sell":
        return (
          <Button className="sell" id="confirm" onClick={handleSell}>
            فروش {destinationCrypto.name}{" "}
          </Button>
        );
      case "swap":
        return (
          <Button className="swap" id="confirm" onClick={handleSwap}>
            تبدیل {sourceCrypto.name} به {destinationCrypto.name}
          </Button>
        );
      default:
        return null;
    }
  };

  const handleBuy = () => {
    console.log("دکمه ی خرید");
  };

  const handleSell = () => {
    console.log("دکمه ی فروش");
  };

  const handleSwap = () => {
    console.log("دکمه ی تبدیل");
  };

  return (
    <section className="temx-tradebox">
      <div className="content">
        <Form>
          <div className="side-selection">
            <Button
              onClick={() => handleOnClick("buy")}
              className={activeButton === "buy" ? "active" : ""}
            >
              {" "}
              خرید{" "}
            </Button>
            <Button
              onClick={() => handleOnClick("sell")}
              className={activeButton === "sell" ? "active" : ""}
            >
              فروش{" "}
            </Button>
            <Button
              onClick={() => handleOnClick("swap")}
              className={activeButton === "swap" ? "active" : ""}
            >
              {" "}
              تبدیل{" "}
            </Button>
          </div>

          <div className="input-row">
            <div className="label">
              <label>ارز مبداء</label>
            </div>
            <Spin spinning={loading}>
              <Input
                type="number"
                addonBefore="واحد"
                addonAfter={
                  <Select
                    showSearch
                    placeholder="انتخاب ارز"
                    optionFilterProp="children"
                    onChange={handleSourceMarketSelect}
                    value={sourceMarketIndex}
                    style={{ caretColor: "black", cursor: "pointer" }}
                    dropdownStyle={{ direction: "rtl" }}
                    popupMatchSelectWidth
                  >
                    {cryptoData.map((crypto, index) => (
                      <Select.Option key={index} value={index}>
                        {crypto.label}
                      </Select.Option>
                    ))}
                  </Select>
                }
              />
            </Spin>
          </div>
          <div className="input-row">
            <div className="label">
              <label>ارز مقصد</label>
            </div>
            <Spin spinning={loading}>
              <Input
                type="number"
                addonBefore="واحد"
                addonAfter={
                  <Select
                    showSearch
                    placeholder="انتخاب ارز"
                    optionFilterProp="children"
                    onChange={handleDestinationMarketSelect}
                    value={destinationMarketIndex}
                    style={{ caretColor: "black", cursor: "pointer" }}
                    dropdownStyle={{ direction: "rtl" }}
                    popupMatchSelectWidth
                  >
                    {cryptoData.map((crypto, index) => (
                      <Select.Option key={index} value={index}>
                        {crypto.label}
                      </Select.Option>
                    ))}
                  </Select>
                }
              />
            </Spin>
          </div>
          {renderActionButton()}
        </Form>
      </div>
    </section>
  );
}
